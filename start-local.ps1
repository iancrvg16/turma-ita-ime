$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    $projectRuntime = Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot '.tools') -Directory -Filter 'node-v*-win-x64' -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $projectRuntime) { throw 'Instale Node.js 22.13 ou superior e execute novamente. Instruções em README.md.' }
    $env:Path = $projectRuntime.FullName + ';' + $env:Path
}

if (-not (Test-Path -LiteralPath (Join-Path $PSScriptRoot 'dist/index.html'))) {
    Write-Host 'Preparando o build local. Prefira armazenar o projeto em um SSD para instalar dependências.'
    & npm.cmd ci --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'Falha na instalação das dependências.' }
    & npm.cmd run build
    if ($LASTEXITCODE -ne 0) { throw 'Falha no build de produção.' }
}

& node scripts/serve-production.mjs
