#!/usr/bin/env bash

function bootstrap() {
	if [[ ! -d "$base_path/node_modules" ]]; then
		echo "Bootstrapping project..."
		npm i
		npx lerna bootstrap
		docker-compose build
	fi
}
