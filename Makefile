down-all:
	docker-compose down

down-db:
	docker-compose stop db
	docker-compose rm -f db

down:
	docker-compose stop backend
	docker-compose rm -f backend

up-db: down-db
	docker-compose up -d db

build: down
	docker-compose run --rm --service-ports backend yarn build

dev: down
	docker-compose run --rm --service-ports backend yarn dev

setup: down
	docker-compose run --rm --service-ports backend yarn install

logs:
	docker-compose logs -f --tail=100 backend

logs-db:
	docker-compose logs -f --tail=100 db

test: down
	docker-compose run --rm --service-ports backend yarn test
