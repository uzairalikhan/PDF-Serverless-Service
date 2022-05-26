# PDF Service
This repository is responsible for generating PDFs using javascript pdf generation library https://github.com/bpampuch/pdfmake

## Deployment:
### Prerequisite:
* Install and configure AWS cli
* Configure AWS for account you want to deploy this stack (Or export creds in current terminal)
* Install SAM-CLI

### Commands:
* Run `npm i` in root directory
* Run `npm i` in "src/node_modules_layer/nodejs" directory to install layer dependencies
* Run `npm build` to build the stack
* Run `sam deploy --config-file samconfig/samconfig-{env}.json` to deploy stack to respective environment

## Unit Test:
* Run `npm run test` for running unit tests for available lambdas

## Linting
* Run `npm run lint` for linting errors
* Run `npm run lint-fix` for fixing linting errors
