# Variables
ENV_FILE := .env

# ENV Variables
STAGE ?= local
STATION_ID ?= # set to your birdweather station id
HOSTNAME ?= localhost

# docker internals
DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_CMD = docker compose
DOCKER_SERVICE = 
DOCKER_LOGS_FOLLOW = 

DOCKER_PUBLIC_PORT_HTTP ?= 8000: # use 80: to bind to 80 instead of a random port
DOCKER_PUBLIC_PORT_HTTPS ?= 8443: # use 433: to bind to 443 instead of a random port

# fallback to older version
ifneq ($(shell which docker-compose),)
	DOCKER_COMPOSE_CMD = docker-compose
endif

# if you are more modern and use podman-compose
ifneq ($(shell which podman-compose),)
	DOCKER_COMPOSE_CMD = podman-compose
endif
	
# Ensure exported variables are available in all recipes
export STAGE HOSTNAME STATION_ID DOCKER_COMPOSE_CMD

.PHONY: all
all: banner

.PHONY: run
run: banner up welcome

.PHONY: up
up: $(ENV_FILE)
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) up --detach

.PHONY: build
build: Dockerfile down up

Dockerfile: Pipfile.lock
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) build
	touch $@

Pipfile.lock: Pipfile
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) run --volume ./:/app2 \
		--workdir /app2 --entrypoint=/usr/local/bin/pipenv app lock

.PHONY: stop
stop: down banner goodbye

.PHONY: down
down:
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) down

.PHONY: ps
ps:
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) ps

.PHONY: logs
logs:
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) logs $(DOCKER_SERVICE) $(DOCKER_LOGS_FOLLOW)

.PHONY: banner
banner:
	@echo ""
	@echo "     \\\\ "
	@echo "     (o> "
	@echo "  \\\\_//) "
	@echo "   \_/_)"
	@echo "    _|_ "

welcome:
	@echo ""
	@echo "\033[1;34m👋 Welcome to the vogel-spotter application\033[0m"
	@echo ""

goodbye:
	@echo ""
	@echo "\033[1;34m👋 Goodbye\033[0m"
	@echo ""

$(ENV_FILE):
	echo "STATION_ID=$(STATION_ID)" > $@
	echo "DOCKER_PUBLIC_PORT_HTTP=$(DOCKER_PUBLIC_PORT_HTTP)" >> $@
	echo "DOCKER_PUBLIC_PORT_HTTPS=$(DOCKER_PUBLIC_PORT_HTTPS)" >> $@
