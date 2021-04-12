#!/usr/bin/env sh
set -ex

SSH_USER=guillaume
SSH_HOST=masclet.net
REMOTE_PATH=/home/guillaume/www/guillaume.masclet.net/

rsync -av --delete \
    --exclude=deploy.sh \
    --exclude=NOTICE.txt \
    --exclude=README.md \
    --exclude=.git \
    --exclude=.env \
    --exclude=*.dist \
    --exclude=node_modules \
    --exclude=src \
    --exclude=.gitignore \
    --exclude=gulpfile.js \
    --exclude=package.json \
    --exclude=package-lock.json \
    --exclude=.bin \
    ./ "$SSH_USER@$SSH_HOST:$REMOTE_PATH"
