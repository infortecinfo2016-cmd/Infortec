#!/usr/bin/env bash
# Instala a skill meu-plantio-design no Claude Code e/ou no Codex.
#
# Uso:
#   ./instalar.sh                     instala para o seu usuário no Claude Code e no Codex
#   ./instalar.sh --claude            só Claude Code   (~/.claude/skills)
#   ./instalar.sh --codex             só Codex         (~/.agents/skills)
#   ./instalar.sh --projeto CAMINHO   dentro de um projeto (CAMINHO/.claude/skills e CAMINHO/.agents/skills)
#   ./instalar.sh --codex-antigo      também copia para ~/.codex/skills (versões antigas do Codex)
#   ./instalar.sh --remover           remove dos mesmos lugares
set -euo pipefail

NOME="meu-plantio-design"
ORIGEM="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$NOME"

claude=0; codex=0; antigo=0; remover=0; projeto=""
while [ $# -gt 0 ]; do
  case "$1" in
    --claude) claude=1 ;;
    --codex) codex=1 ;;
    --codex-antigo) antigo=1 ;;
    --projeto) projeto="${2:?informe o caminho do projeto}"; shift ;;
    --remover) remover=1 ;;
    -h|--help) sed -n '2,11p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Opção desconhecida: $1 (use --help)" >&2; exit 1 ;;
  esac
  shift
done
[ "$claude" = 0 ] && [ "$codex" = 0 ] && { claude=1; codex=1; }

[ -f "$ORIGEM/SKILL.md" ] || { echo "Não encontrei $ORIGEM/SKILL.md" >&2; exit 1; }

if [ -n "$projeto" ]; then
  base="$(cd "$projeto" && pwd)"
  dir_claude="$base/.claude/skills"
  dir_codex="$base/.agents/skills"
else
  dir_claude="$HOME/.claude/skills"
  dir_codex="$HOME/.agents/skills"
fi

destinos=()
[ "$claude" = 1 ] && destinos+=("$dir_claude")
[ "$codex" = 1 ] && destinos+=("$dir_codex")
[ "$antigo" = 1 ] && destinos+=("${CODEX_HOME:-$HOME/.codex}/skills")

for d in "${destinos[@]}"; do
  alvo="$d/$NOME"
  if [ "$remover" = 1 ]; then
    rm -rf "$alvo" && echo "Removida: $alvo"
  else
    mkdir -p "$d"
    rm -rf "$alvo"
    cp -R "$ORIGEM" "$alvo"
    echo "Instalada: $alvo"
  fi
done

[ "$remover" = 1 ] || echo "Pronto. Abra uma nova sessão do Claude Code ou do Codex para a skill aparecer."
