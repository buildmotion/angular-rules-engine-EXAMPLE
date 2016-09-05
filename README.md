# Angular Rules Engine :: Example
This is an example of using the [Angular Rules Engine](https://github.com/buildmotion/angular-rules-engine). This application will demonstrate how to configure the application to use the rule engine.

Prerequisites: 
+ Angular CLI
+ NodeJS/NPM

1. Create a new Angular 2 application using the Angular 2 CLI. Use the `ng init` command to create the source in an existing folder.
```txt
    ng init
```
2. Run: `npm install angular-rules-engine`

```txt
npm install angular-rules-engine
```

3. Update the `dependencies` section of the package.json file to include "angular-rules-engine".
```js
{
  "name": "angular-rules-engine-example",
  "version": "0.0.0",
  "license": "MIT",
  "angular-cli": {},
  "scripts": {
    "start": "ng serve",
    "postinstall": "typings install",
    "lint": "tslint \"src/**/*.ts\"",
    "test": "ng test",
    "pree2e": "webdriver-manager update",
    "e2e": "protractor"
  },
  "private": true,
  "dependencies": {
    "@angular/common": "2.0.0-rc.4",
    "@angular/compiler": "2.0.0-rc.4",
    "@angular/core": "2.0.0-rc.4",
    "@angular/forms": "0.2.0",
    "@angular/http": "2.0.0-rc.4",
    "@angular/platform-browser": "2.0.0-rc.4",
    "@angular/platform-browser-dynamic": "2.0.0-rc.4",
    "@angular/router": "3.0.0-beta.2",
    "es6-shim": "0.35.1",
    "reflect-metadata": "0.1.3",
    "rxjs": "5.0.0-beta.6",
    "systemjs": "0.19.26",
    "zone.js": "0.6.12",
    "angular-rules-engine": "0.0.5"
  },
  "devDependencies": {
    "angular-cli": "1.0.0-beta.10",
    "codelyzer": "0.0.20",
    "ember-cli-inject-live-reload": "1.4.0",
    "jasmine-core": "2.4.1",
    "jasmine-spec-reporter": "2.5.0",
    "karma": "0.13.22",
    "karma-chrome-launcher": "0.2.3",
    "karma-jasmine": "0.3.8",
    "protractor": "3.3.0",
    "ts-node": "0.5.5",
    "tslint": "3.11.0",
    "typescript": "1.8.10",
    "typings": "1.3.1"
  }
}
```

4. Update the "angular-build-cli.js" file to include the angular-rules-engine files.

```js
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angular-rules-engine/action/*.+(js|js.map)',
      'angular-rules-engine/rules/*.+(js|js.map)',
      'angular-rules-engine/service/*.+(js|js.map)',
      'angular-rules-engine/validation/*.+(js|js.map)'
    ]
  });
};
```
