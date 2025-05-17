# Delivery Services

Plateforme de prise de commandes et suivi de livraisons, construite en micro-services hexagonaux.

## Vision
- Micro-services découplés (Order, Delivery, Pricing, Gateway, Analytics)  
- DDD + Ports & Adaptateurs  
- CQRS-ES pour Pricing  
- Cluster MariaDB Galera pour HA  
- CI/CD GitHub Actions  
- Monitoring Prometheus & Grafana  

## Arborescence
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

1. Générer la structure (si nécessaire)  
   ```bash
   chmod +x create_structure.sh
   ./create_structure.sh
   ```
2. Lancer la stack locale  
   ```bash
   make dev
   ```
3. Tester l’API  
   ```bash
   curl -X POST http://localhost:3000/orders \
     -H "Content-Type: application/json" \
     -d '{"id":"1","customerId":"c1","items":[{"productId":"p1","quantity":1}]}'
   ```

## Critères d’évaluation
- 1. Architecture: adr/ADR-001-architecture-style.md  
- 2. Doc technique: docs/**/*.md  
- 3. Patterns DDD/SOLID/TDD: docs/architecture/patterns.md + tests/  
- 4. Diagrammes: docs/architecture/diagrams.md + diagrams/  
- 5. Résilience: docs/runbooks/*.md  
- 6. Tests unitaires: tests/unit/  
- 7. Scalabilité: docs/architecture/patterns.md  
- 8. Résumé ici  

