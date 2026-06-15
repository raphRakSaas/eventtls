#!/usr/bin/env bash
# Installe ou répare ECC pour EventTLS depuis https://github.com/affaan-m/ECC
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ECC_ROOT="${ECC_ROOT:-$HOME/Documents/perso/ECC}"

if [ ! -d "$ECC_ROOT/scripts" ]; then
  echo "ECC introuvable à $ECC_ROOT"
  echo "Clone : git clone https://github.com/affaan-m/ECC.git $ECC_ROOT"
  exit 1
fi

cd "$PROJECT_ROOT"

echo "==> ECC Cursor (agents, skills, hooks, rules Angular)"
node "$ECC_ROOT/scripts/install-apply.js" \
  --target cursor \
  --profile minimal \
  --with framework:angular \
  --with skill:angular-developer \
  --with skill:postgres-patterns \
  --with skill:tdd-workflow \
  --with skill:verification-loop

echo ""
echo "==> ECC Claude Code project-level (.claude/)"
node "$ECC_ROOT/scripts/install-apply.js" \
  --target claude-project \
  --profile minimal \
  --with framework:angular \
  --with skill:angular-developer \
  --with skill:postgres-patterns \
  --with skill:tdd-workflow \
  --with skill:verification-loop

echo ""
echo "==> Vérification"
node "$ECC_ROOT/scripts/doctor.js" 2>/dev/null || true
echo "Terminé. Voir docs/ECC-SETUP.md"
