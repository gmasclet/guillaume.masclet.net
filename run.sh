#!/usr/bin/env bash
RUN="run -it --rm -v $PWD:/app -w /app node:15.10.0-buster"

if [ $# -lt 1 ]
then
  echo 'Please provide a script as a command line argument'
  docker $RUN npm run
else
  docker $RUN npm install
  docker $RUN npm run $1
fi
