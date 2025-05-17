.PHONY: dev order gateway tests chaos

dev:
	docker-compose up --build

order:
	cd services/order && npm install && npm run build && npm start &

gateway:
	cd services/gateway && npm install && npm start &

tests:
	cd services/order && npm test

chaos:
	infra/scripts/chaos-kill-node.sh
