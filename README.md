# Angular Kirby

[![Build Status](https://travis-ci.com/llstarscreamll/kirby-app.svg?branch=master)](https://travis-ci.com/llstarscreamll/kirby-app)
[![codecov](https://codecov.io/gh/llstarscreamll/kirby-app/branch/master/graph/badge.svg)](https://codecov.io/gh/llstarscreamll/kirby-app)
[![dependencies Status](https://david-dm.org/llstarscreamll/kirby-app/status.svg)](https://david-dm.org/llstarscreamll/kirby-app)
[![devDependencies Status](https://david-dm.org/llstarscreamll/kirby-app/dev-status.svg)](https://david-dm.org/llstarscreamll/kirby-app?type=dev)
![GitHub](https://img.shields.io/github/license/llstarscreamll/kirby-app?logo=github)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) using [Nrwl Nx](https://nrwl.io/nx).

## Requirements

Install gcc on Fedora:

```bash
sudo dnf install gcc-c++
```

Install gcc on Debian/Ubuntu:

```bash
sudo apt install build-essential
```

```bash
npm install --global @angular/cli nx
```

## Build

To build all apps:

```bash
nx build --project=pascal --prod -c=production # build the web app
nx build --project=desktop-front --prod -c=production # build electron frontend
nx build --project=desktop-back --prod -c=production # build electron backend
nx run desktop-back:make --platform=linux --arch=x64 --publishPolicy=never # packaging electron .deb, .snap, etc
```

To build desktop app for production:

```bash
npm run nx build -- --project=desktop-front --prod -c=production && \
npm run nx build -- --project=desktop-back --prod -c=production && \
npm run nx run desktop-back:make -- --platform=linux --arch=x64 --publishPolicy=never
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
