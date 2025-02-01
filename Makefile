# Variables
ENV_FILE := .env

# ENV Variables
STAGE ?= local
STATION_ID ?= 
HOSTNAME ?= localhost

# docker internals
DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_CMD = docker compose
DOCKER_SERVICE = 
DOCKER_LOGS_FOLLOW = 

DOCKER_PUBLIC_PORT_HTTP = # use 80: to bind to 80 instead of a random port
DOCKER_PUBLIC_PORT_HTTPS = # use 433: to bind to 443 instead of a random port

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
run: banner up

.PHONY: up
up: $(ENV_FILE)
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) up --detach

.PHONY: build
build:
	$(DOCKER_COMPOSE_CMD) -f $(DOCKER_COMPOSE_FILE) build

.PHONY: stop
stop: down banner

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
	@echo ""

$(ENV_FILE):
	echo "STATION_ID=$(STATION_ID)" > $@

