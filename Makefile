# Define variables
PROJECT_NAME="kirby-web"
PROJECT_HOME="~/projects/$(PROJECT_NAME)"
ARTIFACT_VERSION=$(shell date +%Y%m%d%H%M%S)

# Default target
.PHONY: all
all: help

# Help target
.PHONY: help
help:
	@echo "Usage:"
	@echo "  make deploy        Deploy the application"

# Deploy the application
.PHONY: deploy
deploy:
	@set -e
	@echo "Artifact version $(ARTIFACT_VERSION)"

	# compile web
	@rm -rf dist
	@docker compose up build-web

	# mark release
	echo "$(ARTIFACT_VERSION)" > ./dist/apps/pascal/release-name.txt

	# generate artifact
	@cd dist/apps/pascal && zip -r -q ../../../artifact-$(ARTIFACT_VERSION).zip . && cd -
	
	# create directories on remote server
	@ssh root@200.7.107.218 "mkdir -p $(PROJECT_HOME)/releases"
	
	# upload to remote server
	@scp artifact-$(ARTIFACT_VERSION).zip root@200.7.107.218:$(PROJECT_HOME)/

	# remove local artifact
	@rm artifact-*.zip

	# unzip artifact on remote server
	@ssh root@200.7.107.218 "unzip -q -o $(PROJECT_HOME)/artifact-$(ARTIFACT_VERSION).zip -d $(PROJECT_HOME)/releases/$(ARTIFACT_VERSION)"

	# set nginx config
	@ssh root@200.7.107.218 "mkdir -p $(PROJECT_HOME)/releases/$(ARTIFACT_VERSION)/stubs"
	@scp stubs/site-nginx.conf root@200.7.107.218:$(PROJECT_HOME)/releases/$(ARTIFACT_VERSION)/stubs/site-nginx.conf
	@ssh root@200.7.107.218 "cd $(PROJECT_HOME)/releases/$(ARTIFACT_VERSION) && sed -i 's|##DOCUMENT_ROOT##|/usr/share/nginx/html/projects/$(PROJECT_NAME)|g' stubs/site-nginx.conf"

	# set files and folders permissions
	@ssh root@200.7.107.218 "chown -R nginx:nginx $(PROJECT_HOME)/releases/$(ARTIFACT_VERSION)"

	# publish new release
	@ssh root@200.7.107.218 "ln -nfs $(PROJECT_HOME)/releases/$(ARTIFACT_VERSION) /usr/share/nginx/html/projects/$(PROJECT_NAME)"

	# restart nginx
	@ssh root@200.7.107.218 "nginx -t"
	@ssh root@200.7.107.218 "systemctl restart nginx"

	# clean up old releases
	@ssh root@200.7.107.218 "cd $(PROJECT_HOME)/releases && ls -t | tail -n +10 | xargs rm -rf"
