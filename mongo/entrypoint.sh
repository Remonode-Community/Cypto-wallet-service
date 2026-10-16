#!/bin/bash
# Mongo entrypoint wrapper: writes the replica-set keyFile (required because
# authorization + replica sets are enabled), then hands off to the official
# image entrypoint so root-user initialization still runs.
set -euo pipefail

KEYFILE="${MONGO_KEYFILE_PATH:-/data/configdb/keyfile}"

if [ -z "${MONGO_REPLSET_KEYFILE:-}" ]; then
  echo "MONGO_REPLSET_KEYFILE is required (auth + replica set needs a keyFile)" >&2
  exit 1
fi

mkdir -p "$(dirname "$KEYFILE")"
umask 077
printf '%s\n' "$MONGO_REPLSET_KEYFILE" > "$KEYFILE"
chown mongodb:mongodb "$KEYFILE"
chmod 400 "$KEYFILE"

exec /usr/local/bin/docker-entrypoint.sh mongod \
  --replSet rs0 \
  --bind_ip_all \
  --port 27017 \
  --keyFile "$KEYFILE"
