#!/bin/bash

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

# Replace localhost with hostname in docker-compose.yml
DOCKER_COMPOSE_FILE="docker-compose.yml"
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/localhost/$HOSTNAME/" "$DOCKER_COMPOSE_FILE"
else
    sed -i.old "s/localhost/$HOSTNAME/" "$DOCKER_COMPOSE_FILE"
fi
echo "Updated DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: $HOSTNAME"

# Update or create .env file with station ID
ENV_FILE=".env"
if [[ ! -f "$ENV_FILE" ]]; then
    touch "$ENV_FILE"
fi

if grep -q "STATION_ID=" "$ENV_FILE"; then
    sed -i.old "s/STATION_ID=.*/STATION_ID=$STATION_ID/" "$ENV_FILE"
else
    echo "STATION_ID=$STATION_ID" >> "$ENV_FILE"
fi
echo "Updated $ENV_FILE with STATION_ID: $STATION_ID"

# Run docker-compose
echo "Running docker-compose up with build..."
docker compose -f "$DOCKER_COMPOSE_FILE" up --build --detach