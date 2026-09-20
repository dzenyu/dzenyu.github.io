#!/bin/bash
#
# Starts the web site (Astro)
#
# Usage: ./start-site.sh [dev|build]
#   dev   - install deps and run the dev server (default), reachable on the
#           local network via --host (see astro.config.mjs)
#   build - install deps and produce a production build in dist/
set -e

mode="${1:-dev}"

npm install

case "$mode" in
  dev)
    npm run dev
    ;;
  build)
    npm run build
    ;;
  *)
    echo "Usage: $0 [dev|build]" >&2
    exit 1
    ;;
esac
