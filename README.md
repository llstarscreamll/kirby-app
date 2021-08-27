# Angular Kirby

[![Build Status](https://travis-ci.com/llstarscreamll/angular-kirby.svg?branch=master)](https://travis-ci.com/llstarscreamll/angular-kirby)
[![codecov](https://codecov.io/gh/llstarscreamll/angular-kirby/branch/master/graph/badge.svg)](https://codecov.io/gh/llstarscreamll/angular-kirby)
[![dependencies Status](https://david-dm.org/llstarscreamll/angular-kirby/status.svg)](https://david-dm.org/llstarscreamll/angular-kirby)
[![devDependencies Status](https://david-dm.org/llstarscreamll/angular-kirby/dev-status.svg)](https://david-dm.org/llstarscreamll/angular-kirby?type=dev)
![GitHub](https://img.shields.io/github/license/llstarscreamll/angular-kirby?logo=github)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Build

To build all apps:

```bash
ng build --project=pascal --prod --config=prod # build the web app
ng build --project=electron-front --prod --config=prod # build electron frontend
ng build --project=electron-back --prod --config=prod # build electron backend
nx run electron-back:make --platform=linux --arch=x64 --publishPolicy=never # packaging electron .deb, .snap, etc
```

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io/).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploy Web App

```bash
envoy run deploy --project=pascal
```

## CRUD Management

It's a full GUI data management for plain and boring CRUD operations driven by a configuration file in json format that makes available the next routes, e.g. with a `User` resource:

```text
localhost:4200/options/users/ -> listing users table with search capabilities
localhost:4200/options/users/create -> create a user
localhost:4200/options/users/1 -> show specific user details with trash, delete and restore capabilities
localhost:4200/options/users/1/edit -> edit specific user data
```

To create said GUI you need to write a config file like this:

```json
{
  "users": {
    "label": "Usuarios",
    "endpoint": "api/v1/users",
    "attributes": {
      "first_name": { "label": "Nombres", "type": "string", "required": true, "minLength": 3, "maxLength": 100 },
      "last_name": { "label": "Apellidos", "type": "string", "required": true, "minLength": 3, "maxLength": 100 },
      "roles": {
        "label": "Roles",
        "type": "remote-select",
        "required": false,
        "multiple": true,
        "endpoint": "api/v1/roles"
      }
    }
  }
}
```
