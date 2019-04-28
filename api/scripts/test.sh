#!/bin/bash

DIR="$(dirname $0)"
COMPOSE="$DIR/../docker-compose.test.yml"

docker-compose -f $COMPOSE up --force-recreate --build --remove-orphans -d api db
sleep 5
docker-compose -f $COMPOSE up newman
RESULT=$?
docker-compose -f $COMPOSE down
exit $RESULT