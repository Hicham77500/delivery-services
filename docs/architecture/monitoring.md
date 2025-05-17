# Monitoring avec Prometheus & Grafana

## Export de métriques
- Chaque service expose un endpoint `/metrics` (Prometheus client).  
- Exemples fournis par le Gateway :
  - `gateway_orders_created_total` : compteur de commandes reçues  
  - `gateway_order_request_duration_seconds` : histogramme des temps de traitement  

## Configuration Prometheus
Ajoutez dans votre `prometheus.yml` (dans `infra/` ou sur votre serveur Prometheus) :

```yaml
scrape_configs:
  - job_name: 'gateway'
    static_configs:
      - targets: ['host.docker.internal:3000']
  - job_name: 'order'
    static_configs:
      - targets: ['host.docker.internal:3001']  # si /metrics implémenté
  - job_name: 'galera'
    metrics_path: '/metrics'  # si MariaDB exporter
    static_configs:
      - targets: ['host.docker.internal:9104']  # exporter MariaDB/Galera
```

## Lancement rapide
```bash
# Lancer Prometheus
docker run -d --name prometheus -p 9090:9090 \
  -v $(pwd)/infra/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus

# Lancer Grafana
docker run -d --name grafana -p 3001:3000 grafana/grafana
```

## Dashboard Grafana
- Configurez la source de données Prometheus sur `http://host.docker.internal:9090`.  
- Importez un dashboard Node.js (par ex. ID 1229) et un dashboard MariaDB/Galera (ID 8628).  
