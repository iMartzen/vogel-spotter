# Variables
ENV_FILE := .env

# read envfile for persistancy
-include $(ENV_FILE)

# ENV Variables
STAGE ?= local
HOSTNAME ?= localhost
# set to your birdweather station id
STATION_ID ?= 

# docker internals
DOCKER_COMPOSE_FILE = docker-compose.yml
DOCKER_COMPOSE_CMD = docker compose
DOCKER_SERVICE = 
DOCKER_LOGS_FOLLOW = 

# use 80:, 443: to bind to lower ports instead of a 8000:
# use a empty value for random ports
PUBLIC_PORT_HTTP ?= 8000:
PUBLIC_PORT_HTTPS ?= 8443:

# fallback to older version docker-compose
ifneq ($(shell which docker-compose),)
	DOCKER_COMPOSE_CMD = docker-compose
endif

# if you are more modern and use podman and podman-compose
ifneq ($(shell which podman-compose),)
	DOCKER_COMPOSE_CMD = podman-compose
endif
	
# Ensure exported variables are available in all recipes
export STAGE HOSTNAME STATION_ID DOCKER_COMPOSE_CMD
export PUBLIC_PORT_HTTP PUBLIC_PORT_HTTPS

.PHONY: all
all: banner

.PHONY: run
run: banner up welcome

.PHONY: up
up:
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

# write a envfile to make your variables persistant
export ENV_FILE_CONTENTS
$(ENV_FILE):
	@echo "$${ENV_FILE_CONTENTS}" > $@
	# contents of $(ENV_FILE)
	@cat $@

# contents of the env file
define ENV_FILE_CONTENTS
STATION_ID=$(STATION_ID)
STAGE=$(STAGE)
HOSTNAME=$(HOSTNAME)
PUBLIC_PORT_HTTP=$(PUBLIC_PORT_HTTP)
PUBLIC_PORT_HTTPS=$(PUBLIC_PORT_HTTPS)
endef
