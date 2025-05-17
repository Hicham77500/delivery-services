# Patterns & Principes

## DDD (Domain-Driven Design)
- Ubiquitous Language : voir `docs/domain/domain-overview.md`  
- Bounded Contexts : Order, Delivery, Pricing, Gateway  

## Architecture Hexagonale
- Ports (interfaces dans `services/*/domain/`)  
- Adaptateurs (impl. concrètes dans `services/*/infra/`)  
- Exemple :  
  ```ts
  // handler injection
  const repo = new InMemoryOrderRepo()
  const handler = new CreateOrderHandler(repo)
  ```

## SOLID & KISS
- SRP, OCP, LSP, ISP, DIP appliqués dans chaque service  
- Code simple et compréhensible (pas d’over-engineering)  

## TDD
- Tests écrits avant le code (ex. `services/order/tests/CreateOrderHandler.test.ts`)  
- Cas happy path et cas d’erreur  

## CQRS & Event Sourcing (Pricing)
- Commandes vs Requêtes séparées  
- Historisation des événements pour projections et audit  
