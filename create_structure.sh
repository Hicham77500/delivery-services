#!/usr/bin/env bash
set -euo pipefail

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Supprime l’arborescence générée précédemment
rm -rf \
  "$BASE_DIR/.github" \
  "$BASE_DIR/adr" \
  "$BASE_DIR/docs" \
  "$BASE_DIR/services" \
  "$BASE_DIR/shared" \
  "$BASE_DIR/infra" \
  "$BASE_DIR/tests" \
  "$BASE_DIR/Makefile" \
  "$BASE_DIR/docker-compose.yml" \
  "$BASE_DIR/README.md"

# Liste des répertoires à créer (avec .gitkeep)
dirs=(
  ".github/workflows"
  "adr"
  "docs/domain"
  "docs/architecture"
  "docs/db"
  "docs/runbooks"
  "services/gateway"
  "services/order"
  "services/delivery"
  "services/pricing"
  "services/analytics"
  "shared/libs"
  "shared/contracts"
  "infra/k8s"
  "infra/terraform"
  "infra/scripts"
  "tests/acceptance"
  "tests/unit"
  "tests/contract"
)

for d in "${dirs[@]}"; do
  mkdir -p "$BASE_DIR/$d"
  touch "$BASE_DIR/$d/.gitkeep"
done

# Fichiers à la racine du projet
touch "$BASE_DIR/Makefile" \
      "$BASE_DIR/docker-compose.yml" \
      "$BASE_DIR/README.md"

echo "🎉 Arborescence régénérée sous $BASE_DIR"
