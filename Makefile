# Variables
DOCKER_COMPOSE_FILE = docker-compose.yml
ENV_FILE := .env

# Ensure exported variables are available in all recipes
export STAGE HOSTNAME STATION_ID DOCKER_COMPOSE_CMD

all: banner
run: banner 

banner:
	@echo ""
	@echo "     \\\\ "
	@echo "     (o> "
	@echo "  \\\\_//) "
	@echo "   \_/_)"
	@echo "    _|_ "
	@echo ""

