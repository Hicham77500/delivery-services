# Delivery Services

Plateforme de gestion de commandes et livraisons, hautement disponible et évolutive  
Micro-services hexagonaux, DDD, CQRS-ES (Pricing), cluster Galera, CI/CD, monitoring.

## Structure
.  
├── .github/workflows/…  
├── adr/…  
├── docs/…  
├── infra/…  
├── services/  
│   ├── gateway/  
│   ├── order/  
│   ├── delivery/  
│   ├── pricing/  
│   └── analytics/  
├── shared/…  
├── tests/…  
├── Makefile  
├── docker-compose.yml  
└── README.md  

## Stack & Démarrage rapide
- Node.js + TypeScript, Express  
- MariaDB Galera (3 nœuds)  
- Prometheus & Grafana pour monitoring  
- GitHub Actions pour CI/CD

```bash
# 1. Générer structure (si besoin)
chmod +x create_structure.sh && ./create_structure.sh

# 2. Lancer infra
cd infra && docker-compose up -d

# 3. Services
cd ../services/order && npm install && npm run build && npm start &
cd ../gateway   && npm install && npm start &

# 4. Test
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"id":"1","customerId":"c1","items":[{"productId":"p1","quantity":1}]}'
```

## Patterns & Principes
- DDD (domain-driven design) – voir `docs/domain/domain-overview.md`  
- Architecture hexagonale – ports & adaptateurs isolent la logique métier  
- SOLID & KISS – principes appliqués dans chaque service  
- TDD – tests unitaires avant implémentation (`services/order/tests/`)  
- CQRS-ES pour Pricing – historisation, projections  
- HA & failover – cluster Galera (`infra/docker-compose.yml`)

## Critères d’évaluation
| Critère                                    | Preuve / Emplacement                                     |
|--------------------------------------------|----------------------------------------------------------|
| 1. Justification architecture              | `adr/ADR-001-architecture-style.md`                      |
| 2. Documentation technique                 | `docs/architecture/`, `docs/db/`, `docs/runbooks/`       |
| 3. Patterns DDD, SOLID, KISS, TDD         | `docs/architecture/patterns.md`, `services/*/tests/`     |
| 4. Diagrammes                              | `docs/architecture/diagrams.md` + `docs/architecture/diagrams/*.png` |
| 5. Résilience & failover                   | `docs/runbooks/resilience.md`, `docs/runbooks/*playbook.md` |
| 6. Tests unitaires & TDD                   | `services/order/tests/CreateOrderHandler.test.ts`        |
| 7. Scalabilité                             | `docs/architecture/patterns.md`                          |
| 8. Résumé des critères                     | cette section                                            |

