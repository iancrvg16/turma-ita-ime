# Turma ITA/IME — Pirambu Innovation

Website institucional e educacional independente, em português. Identidade visual **VETOR — Ciência em Movimento**: composição editorial, desenho técnico original e ciência explorável. Implementado com React, TypeScript estrito, Vite e React Router, sem backend, cadastro, rastreamento ou serviços pagos.

## Executar

Requisito: Node.js 22.13 ou superior e npm. Use o `package-lock.json` incluído.

```sh
npm ci
npm run dev
```

Abra **http://127.0.0.1:5173**. Neste ambiente Windows também foi preparado um Node portátil em `.tools/`, ignorado pelo Git. Para usá-lo sem alterar a instalação do sistema:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-local.ps1
```

Esse comando abre o **build de produção incluído**, em **http://127.0.0.1:5173**, sem precisar instalar dependências para visualizá-lo. O servidor usa apenas os módulos nativos do Node e atende as URLs limpas e a página 404. Ctrl+C encerra o servidor.

O script usa um Node instalado ou o runtime portátil do próprio diretório. A pasta `.tools` é uma conveniência deste ambiente e não integra o ZIP de entrega; em outro computador, instale Node normalmente. Se `dist/` estiver ausente, o script instala as dependências e gera o build antes de servir.

Para desenvolvimento com atualização automática, use `npm ci` e `npm run dev`. Neste dispositivo, prefira um SSD para instalar dependências: o volume D apresentou custo elevado de gravação de muitos arquivos pequenos. O código e o build da entrega permanecem em `D:\turma-ita`; a validação foi feita em uma cópia temporária, com conferência de integridade na entrega.

## Verificar e testar a produção

```sh
npm run typecheck
npm run lint
npm run format:check
npm run test:unit
npm run build
npm run preview
```

O preview abre em **http://127.0.0.1:4173**. O build pré-renderiza as nove rotas e uma página 404, incluindo conteúdo e metadados próprios. O JavaScript hidrata esse HTML e carrega as páginas secundárias em bundles separados.

```sh
npx playwright install chromium
npm test
```

O runner inicia o preview se necessário. É preciso gerar o build antes. Alternativamente, para usar um Chrome já instalado no Windows:

```powershell
$env:PLAYWRIGHT_CHROME_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
npm test
```

Os testes cobrem as sete larguras do briefing, navegação, interações, teclado, conteúdo estático, ausência de dados privados e auditorias axe. As capturas ficam em `docs/previews/`; o relatório detalhado do Playwright em `playwright-report/`. [Resultados da entrega](docs/TESTES.md).

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Abertura cinematográfica, proposta, instituições, disciplinas, equipe e convite |
| `/nossa-turma` | Proposta educacional, acolhimento, fundamentos e colaboração |
| `/ita` | Apresentação do ITA, fontes e linha histórica interativa |
| `/ime` | Apresentação do IME e distinção entre raízes de 1792 e formação de 1959 |
| `/disciplinas` | Mapa de sete áreas, busca de conteúdos e professores relacionados |
| `/equipe` | Sete professores, filtros e conteúdos expansíveis |
| `/pirambu-innovation` | Contexto institucional e história com referência |
| `/participe` | Convite e situação transparente dos contatos ainda não confirmados |
| `/laboratorio` | Ondas, função quadrática e soma vetorial |

Links como `/disciplinas?area=quimica` abrem a disciplina selecionada. As páginas desconhecidas exibem uma interface 404; na Vercel, `404.html` mantém a resposta HTTP de erro.

## Conteúdo e manutenção

- `src/config/site.ts`: contatos, links oficiais e caminhos de assets. Contatos ausentes permanecem `null`; o site não simula atendimento.
- `src/data/team.ts`: nomes, cargos e associações de conteúdos fornecidos pelo briefing, sem dados privados ou currículos presumidos.
- `src/data/subjects.ts`: identidades e descrições das disciplinas.
- `src/data/institutions.ts`: instituições, marcos históricos e referências.
- `src/data/content.ts`: textos centrais da proposta.
- `src/data/routes.ts`: títulos e descrições por página.
- `src/lib/science.ts`: modelos matemáticos puros, com testes independentes.
- `src/components/Artwork.tsx` e `AeroDiagram.tsx`: aeronave conceitual, perfil de asa, estrutura de engenharia e órbitas em SVG, criadas para o projeto.
- `scripts/serve-production.mjs`: preview estático do build, sem dependências externas e com resposta HTTP 404 para páginas desconhecidas.
- `public/assets/social.svg` e `social.png`: imagem de compartilhamento original.
- `src/styles/index.css`: tokens, componentes, animações e composição responsiva, organizados em camadas CSS.

As iniciais dos professores são ilustrações abstratas, não fotografias. Para substituir por retratos autorizados, adicione os arquivos a `public/assets/` e configure `site.assets.teacherPortraits` por ID. O layout já reserva suas dimensões.

[Fontes e decisões editoriais](docs/FONTES.md) · [Pendências de confirmação](docs/PENDENCIAS.md).

## Acessibilidade e movimento

HTML semântico, link de salto, foco visível, abas com setas/Home/End, menu mobile com contenção de foco e Escape, controles nativos de faixa e conteúdo expansível por teclado. Diagramas decorativos ficam fora da árvore de acessibilidade; simulações têm descrições e valores textuais.

`prefers-reduced-motion` desativa entradas e animações decorativas, preservando todo o conteúdo. O hero também oferece pausa manual. A animação da onda é opcional e começa apenas por ação explícita; para fora de vista ou com a aba do navegador oculta, o tempo da simulação deixa de avançar. Não há rolagem artificial, áudio ou cena WebGL.

Auditorias automáticas não equivalem a certificação WCAG. Os limites das verificações estão no relatório de testes.

## Preparar a Vercel

O projeto está configurado em `vercel.json`: build `npm run build`, saída `dist`, URLs limpas, página 404 e cache de assets. Não há publicação automática nem vínculo a uma conta de hospedagem.

Quando houver um domínio definitivo, crie `.env.local` ou defina na Vercel:

```dotenv
VITE_SITE_URL=https://seu-dominio-confirmado
```

Esse valor é apenas um exemplo de configuração; nenhum domínio oficial é presumido. A variável deve ser uma origem HTTP(S), sem caminho nem barra final. Refaça o build para gerar canonicals, URLs de Open Graph, sitemap e robots. Sem a variável, o site funciona para revisão, o sitemap fica vazio e a indexação é desativada. Não distribua o build de revisão como versão definitiva sem essa configuração.

Na Vercel, selecione este diretório como raiz e Node 22+. O deploy exige autorização do responsável; nenhuma publicação foi feita nesta entrega.

## Assets e dependências

Todos os desenhos são originais e produzidos por código. Nenhum brasão, logotipo oficial das instituições, fotografia de terceiros ou rosto gerado representa pessoas reais. Space Grotesk, DM Sans e IBM Plex Mono são servidas localmente por `@fontsource`, sem pedidos a Google Fonts; suas licenças estão em `public/assets/licenses/` e são incluídas no build.

Não foram reutilizados código, imagens ou identidade visual do Planeta Jovem. A referência foi consultada em modo de leitura.
