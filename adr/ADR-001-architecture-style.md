# ADR-001: Architecture hexagonale & CQRS-ES pour Pricing

## Contexte
La plateforme doit gérer les commandes, leur livraison et la tarification dynamique, avec des besoins forts de scalabilité, de résilience et de clarté des responsabilités.

## Décision
- Adopter une architecture micro-services hexagonale (ports & adaptateurs).  
- Appliquer CQRS (Command Query Responsibility Segregation) & Event Sourcing sur le service Pricing.

## Justifications

### Scalabilité
- Services indépendants : chaque micro-service (Order, Delivery, Pricing…) peut être dimensionné séparément.  
- CQRS-ES : lectures répliquées et optimisées pour la consultation, écritures sur le bus d’événements.

### Évolutivité
- Hexagonal : isole la logique métier des frameworks/infrastructures, facilite le remplacement ou la mise à jour des composants externes.  
- Event Sourcing : historisation complète des événements pour replay, audit, migrations de schéma.

### Séparation des responsabilités
- Chaque service gère un seul domaine (Single Responsibility).  
- CQRS : découpage net entre commandes (modifications d’état) et requêtes (états dérivés).  
- Pricing : calculs asynchrones pilotés par événements, interface claire avec le bus d’événements.

## Conséquences
- Infrastructure d’événements requise (Kafka, RabbitMQ…).  
- Gestion plus complexe des projections et du versioning des événements, mais meilleure traçabilité et résilience.
