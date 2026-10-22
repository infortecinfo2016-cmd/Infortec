# Instala a skill meu-plantio-design no Claude Code e/ou no Codex (Windows / PowerShell).
#
# Uso:
#   .\instalar.ps1                       instala para o seu usuário no Claude Code e no Codex
#   .\instalar.ps1 -Claude               só Claude Code   (%USERPROFILE%\.claude\skills)
#   .\instalar.ps1 -Codex                só Codex         (%USERPROFILE%\.agents\skills)
#   .\instalar.ps1 -Projeto C:\caminho   dentro de um projeto (.claude\skills e .agents\skills)
#   .\instalar.ps1 -CodexAntigo          também copia para %USERPROFILE%\.codex\skills (versões antigas do Codex)
#   .\instalar.ps1 -Remover              remove dos mesmos lugares
#
# Se o Windows bloquear o script: powershell -ExecutionPolicy Bypass -File .\instalar.ps1
param(
  [switch]$Claude,
  [switch]$Codex,
  [switch]$CodexAntigo,
  [string]$Projeto = "",
  [switch]$Remover
)
$ErrorActionPreference = "Stop"
$Nome = "meu-plantio-design"
$Origem = Join-Path $PSScriptRoot $Nome
if (-not (Test-Path (Join-Path $Origem "SKILL.md"))) { throw "Não encontrei $Origem\SKILL.md" }
if (-not $Claude -and -not $Codex) { $Claude = $true; $Codex = $true }

if ($Projeto -ne "") {
  $Base = (Resolve-Path $Projeto).Path
  $DirClaude = Join-Path $Base ".claude\skills"
  $DirCodex  = Join-Path $Base ".agents\skills"
} else {
  $DirClaude = Join-Path $HOME ".claude\skills"
  $DirCodex  = Join-Path $HOME ".agents\skills"
}

$Destinos = @()
if ($Claude) { $Destinos += $DirClaude }
if ($Codex)  { $Destinos += $DirCodex }
if ($CodexAntigo) {
  $CodexHome = if ($env:CODEX_HOME) { $env:CODEX_HOME } else { Join-Path $HOME ".codex" }
  $Destinos += (Join-Path $CodexHome "skills")
}

foreach ($d in $Destinos) {
  $Alvo = Join-Path $d $Nome
  if ($Remover) {
    if (Test-Path $Alvo) { Remove-Item $Alvo -Recurse -Force }
    Write-Host "Removida: $Alvo"
  } else {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
    if (Test-Path $Alvo) { Remove-Item $Alvo -Recurse -Force }
    Copy-Item $Origem $Alvo -Recurse
    Write-Host "Instalada: $Alvo"
  }
}
if (-not $Remover) { Write-Host "Pronto. Abra uma nova sessão do Claude Code ou do Codex para a skill aparecer." }
