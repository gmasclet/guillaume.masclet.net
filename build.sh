#!/usr/bin/env bash
RUN="run -it --rm -v $PWD:/app -w /app node:15.10.0-buster"

docker $RUN npm install
docker $RUN npm run build
