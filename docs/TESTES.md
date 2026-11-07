# Relatório de validação

**Data:** 7 de novembro de 2026. **Resultado:** versão funcional validada, sem publicação.

Ambiente: Windows, Node.js 22.23.4, npm 10.9.9 e Chrome headless 156.0.8078.80. React 19.3.1, TypeScript 6.0.3, Vite 8.3.6 e Playwright 1.65.0. As versões estão fixadas no manifesto e no lockfile.

O volume D apresentou gravação lenta de pequenos arquivos. A instalação, o build e os testes foram executados em uma cópia temporária. O código e o build foram sincronizados com `D:\turma-ita` e novamente conferidos no diretório de entrega: **106 arquivos idênticos por SHA-256, nove rotas HTTP, 31 assets e uma resposta 404 correta**. O preview de produção incluído funciona sem `node_modules`.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| Instalação inicial das dependências | Aprovada |
| Instalação limpa em outro diretório, com `npm ci --offline --no-audit --no-fund` | Aprovada: 173 pacotes a partir do lockfile e do cache |
| `npm run typecheck` | Aprovado, TypeScript estrito |
| `npm run lint` | Aprovado, sem avisos ou erros |
| `npm run format:check` | Aprovado |
| `npm run test:unit` | 3 testes aprovados, sem skips |
| `npm run build` | Aprovado: nove páginas pré-renderizadas, 404 e assets locais |
| `npm test` | **20 cenários aprovados**, sem falhas ou skips |
| Auditoria adicional axe | **20 estados verificados, zero violações automáticas** |
| Preview final iniciado por `start-local.ps1` | Aprovado em `127.0.0.1:5173` |
| Conferência de arquivos entregues | 106 hashes iguais; nenhuma divergência |

O preview foi validado em um servidor estático que serve o build e responde 404 para rotas desconhecidas. Navegação e carregamento inicial também foram verificados durante o desenvolvimento no preview do Vite.

## Cobertura dos testes de navegador

- Nove páginas em **320, 375, 390, 768, 1024, 1440 e 1920 px**, sem overflow horizontal: 63 combinações de rota e largura.
- Navegação interna, rotas profundas, URLs de disciplinas, arquivos estáticos e recuperação de uma página inexistente.
- Menu mobile: abertura, fechamento, Escape, foco e navegação.
- Link de salto, foco visível, abas por setas, seletores e controles nativos por teclado.
- Contexto mobile com `hasTouch`: menu, disciplinas, conteúdo expansível e marcos históricos por toque.
- Comparação ITA/IME, marcos de 1792 e 1950, filtros da linha histórica e alternância das instituições.
- Busca de conteúdos, resultado vazio, limpeza, seleção de áreas e conexão com professores.
- Filtro da equipe e expansão dos conteúdos de Redação.
- Alterações de amplitude, reinício da onda, função com `a = 0` e soma de vetores.
- Todas as páginas com JavaScript desativado: conteúdo inicial disponível no HTML.
- Recuperação após interrupção intencional do carregamento de um bundle.
- Ausência de erros de console nos carregamentos normais e de CPFs formatados no conteúdo verificado.

Os testes matemáticos verificam raízes e interseções, os casos afim e constante, amplitude e periodicidade da onda e somas vetoriais paralelas, perpendiculares e opostas. Forças iguais e opostas geram resultante nula, com direção indefinida; esse caso também é verificado na interface.

## Acessibilidade, animação e inspeção visual

O axe foi executado com regras WCAG 2 A/AA, 2.1 A/AA e 2.2 AA nas nove páginas. A auditoria adicional incluiu a página 404, as sete disciplinas no mobile e os três experimentos: 20 estados sem violações automáticas. Os testes também verificam o menu mobile e estados de interação.

Com movimento normal, foram confirmados: animação ativa do hero, pausa manual, suspensão fora da tela e revelação dos conteúdos ao rolar. Com movimento reduzido, o conteúdo permanece imediatamente visível e as animações decorativas são desativadas. [Registro das verificações de movimento](motion-qa.json).

Foram geradas **18 capturas**. A revisão visual incluiu hero desktop e mobile, apresentação das instituições, mapa das disciplinas, equipe e laboratório. Foram corrigidos o tamanho mínimo do comparador em 320 px, contrastes de legendas e datas, nome acessível da marca e legibilidade dos eixos dos gráficos no celular.

- [Hero desktop](previews/inicio-hero-desktop.png)
- [Hero mobile](previews/inicio-hero-mobile.png)
- [Comparador das instituições](previews/inicio-instituicoes-desktop.png)
- [Mapa das disciplinas no mobile](previews/mapa-mobile.png)
- [Laboratório no mobile](previews/laboratorio-detalhe-mobile.png)
- [Relatório bruto da auditoria axe](axe-audit.json)
- [Hashes e verificações da entrega](INTEGRIDADE.json)

## Desempenho medido

Uma navegação pela homepage por perfil, cache desativado, servidor local, animações normais ativadas. No mobile: viewport de 390 × 844 px, CPU com desaceleração de 4×, latência de 150 ms, download de 1,6 Mbit/s e upload de 0,75 Mbit/s.

| Perfil | LCP | CLS |
| --- | ---: | ---: |
| Desktop, 1440 × 900 px | 0,440 s | 0,00066 |
| Mobile simulado, 390 × 844 px | 1,904 s | 0 |

Os valores ficaram dentro das metas orientativas de LCP e CLS no ensaio realizado. São amostras de laboratório, sem representação do percentil 75 de usuários reais. **INP não foi medido.** [Dados da medição com animações](performance-motion.json). Há também um [ensaio com movimento reduzido](performance.json), realizado durante o refinamento.

Para repetir a medição, com o preview ativo em 4173 e o navegador do Playwright disponível:

```sh
node scripts/measure-performance.mjs --full-motion
```

## Limites e revisão editorial

Não foram executados testes em Safari, Firefox, dispositivos físicos ou leitores de tela. Auditorias automáticas e testes de teclado não constituem certificação integral de conformidade WCAG.

Não foi realizado deploy na Vercel, configurado domínio oficial ou enviado formulário. Contatos permanecem sem dados presumidos. A disponibilidade intermitente de algumas fontes institucionais, grafias de nomes e distribuição atual de atividades estão documentadas em [Fontes](FONTES.md) e [Pendências](PENDENCIAS.md).

Nenhum calendário do relatório de origem, CPF, retrato não autorizado, currículo presumido, métrica de aprovação, parceiro ou promessa de resultado foi incluído no site.
