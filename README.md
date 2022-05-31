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

## Development:
Create PDF template using https://github.com/bpampuch/pdfmake library and place it in `src/templates` directory.
Update map in main handler to add new PDF type and link it with your template.
Validations specific to template should be placed within template js file.
Based on the `type` you provide in input `payload` it will return you the base64 for the provided data.
## Documentation:
Please refer to `documentation` directory that contains sample input payload required for the pdfs

## Unit Test:
* Run `npm run test` for running unit tests for available lambdas

## Linting
* Run `npm run lint` for linting errors
* Run `npm run lint-fix` for fixing linting errors
