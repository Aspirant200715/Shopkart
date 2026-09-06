#!/usr/bin/env bash

set -e

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cleanup() {
  kill "$backend_pid" "$frontend_pid" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

(
  cd "$script_dir/backend"
  npm run dev
) &
backend_pid=$!

(
  cd "$script_dir/frontend"
  npm run dev
) &
frontend_pid=$!

wait "$backend_pid" "$frontend_pid"



# Command to run 
# bash Shopkart/run.sh