#!/bin/bash

# Stop the Docker Compose services
docker-compose down

DOCKER_COMPOSE_FILE="docker-compose.yml"

# Replace the hostname in docker-compose.yml with localhost
sed -i '' "s/'[^']* -> http:\/\/app:8000'/'localhost -> http:\/\/app:8000'/" docker-compose.yml
echo "Reverted DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: localhost"

# Replace the stage in docker-compose.yml with local
sed -i '' "s/STAGE: .*/STAGE: 'local'/" "$DOCKER_COMPOSE_FILE"
echo "Reverted stage in $DOCKER_COMPOSE_FILE to: local"

# Restore the original .env file
if [[ -f ".env.old" ]]; then
    mv .env.old .env
    echo "Restored the original .env file"
else
    echo "No backup .env file found to restore"
fi
