#!/bin/bash

# Display a welcome banner with an ASCII bird
echo -e "\033[1;34m     \\\\ \033[0m"
echo -e "\033[1;34m     (o> \033[0m"
echo -e "\033[1;34m  \\\\_//) \033[0m"
echo -e "\033[1;34m   \_/_)\033[0m"
echo -e "\033[1;34m    _|_ \033[0m"
echo -e "\033[1;34mWelcome to the vogel-spotter Application\033[0m"
echo -e "\033[1;34mBefore we start, we need some information.\033[0m"

# Prompt for stage: local, staging, or production
read -p "Enter the stage (local, staging, production): " STAGE

if [[ "$STAGE" == "local" ]]; then
    HOSTNAME="localhost"
else
    read -p "Enter the hostname: " HOSTNAME_INPUT
fi

# Prompt for station ID
read -p "Enter the station ID: " STATION_ID

# Determine system hostname (use provided HOSTNAME_INPUT if available)
if [[ -n "$HOSTNAME_INPUT" ]]; then
    HOSTNAME="$HOSTNAME_INPUT"
else
    if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
        HOSTNAME=$(hostname)
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        HOSTNAME=$(hostname.exe)
    else
        echo "Unsupported OS type: $OSTYPE"
        exit 1
    fi
fi

# Check if docker-compose or docker compose is installed
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
    echo "docker-compose is installed."
elif command -v docker &> /dev/null && docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
    echo "docker compose is installed."
else
    echo "Neither docker-compose nor docker compose is installed. Please install one of them and try again."
    exit 1
fi

# Replace localhost with hostname in docker-compose.yml
DOCKER_COMPOSE_FILE="docker-compose.yml"
sed -i.old "s/localhost/$HOSTNAME/" "$DOCKER_COMPOSE_FILE" 
echo "Updated DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: $HOSTNAME"

echo $STAGE 

# Replace stage with provided stage in docker-compose.yml only if it's not local
if [[ "$STAGE" != "local" ]]; then
    sed -i.old "s/STAGE: 'local'/STAGE: $STAGE/" "$DOCKER_COMPOSE_FILE"
    echo "Updated stage in $DOCKER_COMPOSE_FILE to: $STAGE"
fi

# Update or create .env file with station ID
ENV_FILE=".env"
if [[ ! -f "$ENV_FILE" ]]; then
    touch "$ENV_FILE"
fi

if grep -q "STATION_ID=" "$ENV_FILE"; then
    sed -i.old "s/STATION_ID=.*/STATION_ID=$STATION_ID/" "$ENV_FILE"
    echo "Updated $ENV_FILE with STATION_ID: $STATION_ID"
else
    echo "STATION_ID=$STATION_ID" >> "$ENV_FILE"
    echo "Created $ENV_FILE with STATION_ID: $STATION_ID"
fi

# Spin up the Docker Compose services
echo "Running $DOCKER_COMPOSE_CMD up with build..."
$DOCKER_COMPOSE_CMD -f "$DOCKER_COMPOSE_FILE" up --build --detach