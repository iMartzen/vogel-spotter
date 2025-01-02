#!/bin/bash

if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
    HOSTNAME=$(hostname)
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    HOSTNAME=$(hostname.exe)
else
    echo "Unsupported OS type: $OSTYPE"
    exit 1
fi

DOCKER_COMPOSE_FILE="local-development-docker-compose.yml"
sed -i.bak "s/localhost/$HOSTNAME/" "$DOCKER_COMPOSE_FILE"
echo "Updated DOMAINS in $DOCKER_COMPOSE_FILE to use hostname: $HOSTNAME"