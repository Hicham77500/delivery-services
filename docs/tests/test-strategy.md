# Stratégie de tests

## Unitaires (TDD)
- Emplacement : `services/*/tests/`  
- Exemples : `CreateOrderHandler.test.ts`  

## Acceptance & Contract
- BDD Gherkin : `tests/acceptance/`  
- Pact / Testcontainers : `tests/contract/`

## CI
- Workflow `.github/workflows/ci.yml`  
- Lint, tests, build Docker  
