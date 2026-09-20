#!/bin/bash
#
# Stops the web site (Astro)
#
# Usage: ./stop-site.sh
#
# Stops a dev/preview server started with --background via Astro's own
# stop command, and falls back to killing any foreground astro dev/preview
# process still running.
set -e

npx astro dev stop 2>/dev/null || true
npx astro preview stop 2>/dev/null || true

pkill -f "astro dev" 2>/dev/null && echo "Stopped astro dev" || true
pkill -f "astro preview" 2>/dev/null && echo "Stopped astro preview" || true
