#!/bin/bash

# Stop the Docker Compose services
docker-compose down

DOCKER_COMPOSE_FILE="docker-compose.yml"

# Replace the hostname in docker-compose.yml with localhost
sed -i '' "s/'[^']* -> http:\/\/app:8000'/'localhost -> http:\/\/app:8000'/" docker-compose.yml
echo -e "\033[37mReverted DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: localhost\033[0m"

# Replace the stage in docker-compose.yml with local
sed -i '' "s/STAGE: .*/STAGE: 'local'/" "$DOCKER_COMPOSE_FILE"
echo -e "\033[37mReverted stage in $DOCKER_COMPOSE_FILE to: local\033[0m"
[ -f "$DOCKER_COMPOSE_FILE.old" ] && echo -e "\033[37mRemoved $DOCKER_COMPOSE_FILE.old\033[0m"

# Restore the original .env file
if [[ -f ".env.old" ]]; then
    mv .env.old .env
    echo -e "\033[37mRestored the original .env file\033[0m"
else
    echo -e "\033[37mNo backup .env file found to restore\033[0m"
fi
[ -f ".env.old" ] && rm -f ".env.old"

# Display a goodbye banner with an ASCII bird
echo -e "\033[1;34m     \\\\ \033[0m"
echo -e "\033[1;34m     (o> \033[0m"
echo -e "\033[1;34m  \\\\_//) \033[0m"
echo -e "\033[1;34m   \_/_)\033[0m"
echo -e "\033[1;34m    _|_ \033[0m"
echo -e "\033[1;34mStopped to the vogel-spotter Application\033[0m"
echo -e "\033[1;34mSee you next time!\033[0m"