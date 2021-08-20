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
