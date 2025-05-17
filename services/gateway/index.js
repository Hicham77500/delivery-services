const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const client = require('prom-client')

// Collecte des metrics par défaut
client.collectDefaultMetrics()

// Compteur de commandes créées
const orderCounter = new client.Counter({
  name: 'gateway_orders_created_total',
  help: 'Total des commandes reçues par le gateway'
})

// Histogramme du temps de traitement des requêtes POST /orders
const requestDuration = new client.Histogram({
  name: 'gateway_order_request_duration_seconds',
  help: 'Durée des requêtes POST /orders',
  buckets: [0.1, 0.5, 1, 2, 5]
})

const app = express()
app.use(bodyParser.json())

// URL du service Order (utile en dev et en conteneurisation)
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3001'

app.post('/orders', async (req, res) => {
  const endTimer = requestDuration.startTimer()
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/orders`,
      req.body
    )
    orderCounter.inc()
    res.status(response.status).json(response.data)
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data)
    } else {
      res.status(500).json({ message: 'Gateway internal error' })
    }
  } finally {
    endTimer()
  }
})

// Endpoint pour Prometheus
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`))
