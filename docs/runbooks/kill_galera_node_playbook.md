# Démo : tuer un nœud MariaDB Galera

## Objectif
Montrer que l’application reste disponible lorsqu’un nœud du cluster Galera est arrêté.

## Script de démo

```bash
# 1. Vérifier la taille du cluster (doit être 3)
docker exec galera1 \
  mysql -uroot -prootpw \
  -e "SHOW STATUS LIKE 'wsrep_cluster_size';"

# 2. Tuer le nœud galera2
docker kill galera2

# 3. Vérifier la taille du cluster (doit être 2)
docker exec galera1 \
  mysql -uroot -prootpw \
  -e "SHOW STATUS LIKE 'wsrep_cluster_size';"

# 4. Tester la disponibilité du service via le gateway
curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"id":"demo1","customerId":"c1","items":[{"productId":"p1","quantity":1}]}'

# 5. Redémarrer le nœud galera2
docker start galera2

# 6. Attendre la réintégration (~10s) puis revérifier la taille (3)
sleep 10
docker exec galera1 \
  mysql -uroot -prootpw \
  -e "SHOW STATUS LIKE 'wsrep_cluster_size';"
```

---

# Incident Playbook

1. **Détection**  
   - Alertes sur `wsrep_cluster_size < 3` dans Prometheus/Grafana.

2. **Notification**  
   - Alerter l’équipe SRE via le canal Slack `#on-call`.

3. **Confinement**  
   - Identifier le nœud fautif (`docker ps` + logs).

4. **Récupération**  
   - Redémarrer le nœud : `docker start galeraX`.

5. **Vérification**  
   - Confirmer `wsrep_cluster_size == 3` et tester l’API.

6. **Post-mortem**  
   - Documenter la durée, la cause et les actions correctives.
