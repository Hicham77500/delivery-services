# Résilience & Failover

## Cluster MariaDB Galera
- Actif‐actif : chaque nœud peut servir les écritures  
- Quorum et réplication synchrone (wsrep)  
- SST (State Snapshot Transfer) pour réintégration  

## Scénario de panne
1. Un nœud tombe : cluster taille = N-1  
2. Requêtes routées vers les nœuds restants  
3. Redémarrage du nœud : SST puis retour à N  
4. Aucune interruption visible pour l’application  

## Playbooks
- Voir `kill_galera_node_playbook.md` pour script de démo  
