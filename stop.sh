#!/bin/bash

echo ""
echo -e "\033[1;34m⏹️ Stopping Docker Compose Service \033[0m"

# Stop the Docker Compose services
docker-compose down
echo ""

# Replace the hostname in docker-compose.yml with localhost
DOCKER_COMPOSE_FILE="docker-compose.yml"
sed -i '' "s/'[^']* -> http:\/\/app:8000'/'localhost -> http:\/\/app:8000'/" docker-compose.yml
echo -e "\033[37m✅ Reverted DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: localhost\033[0m"

# Replace the stage in docker-compose.yml with local
sed -i '' "s/STAGE: .*/STAGE: 'local'/" "$DOCKER_COMPOSE_FILE"
echo -e "\033[37m✅ Reverted stage in $DOCKER_COMPOSE_FILE to: local\033[0m"
[ -f "$DOCKER_COMPOSE_FILE.old" ] && echo -e "\033[37m✅ Removed $DOCKER_COMPOSE_FILE.old\033[0m"

# Restore the original .env file
if [[ -f ".env.old" ]]; then
    mv .env.old .env
    echo -e "\033[33m✅ Restored the original .env file\033[0m"
else
    echo -e "\033[37m✅ No backup .env file found to restore\033[0m"
fi
[ -f ".env.old" ] && rm -f ".env.old"

# Display a goodbye banner with an ASCII bird
echo ""
echo -e "\033[1;34m     \\\\ \033[0m"
echo -e "\033[1;34m     (o> \033[0m"
echo -e "\033[1;34m  \\\\_//) \033[0m"
echo -e "\033[1;34m   \_/_)\033[0m"
echo -e "\033[1;34m    _|_ \033[0m"
echo -e "\033[1;34mStopped to the vogel-spotter application\033[0m"
echo -e "\033[1;34m👋 See you next time!\033[0m"
echo ""