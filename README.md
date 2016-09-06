# Angular Rules Engine :: Example
This is an example of using the [Angular Rules Engine](https://github.com/buildmotion/angular-rules-engine). This application will demonstrate how to configure the application to use the rule engine.

Prerequisites: 
+ Angular CLI
+ NodeJS/NPM

###Create New Angular 2 Application

Create a new Angular 2 application using the Angular 2 CLI. Use the `ng init` command to create the source in an existing folder.

```txt
    ng init
```

###Install angular-rules-engine

Use npm to install the package. The installation process will also add any required dependencies to your project. 

```txt
npm install angular-rules-engine
```
###Update package.json File

Update the `dependencies` section of the package.json file to include `angular-rules-engine`.

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

###angular-build-cli.js

Update the "angular-build-cli.js" file to include the angular-rules-engine files.
        
    Note: Make sure you add the [ts] extension on the mapping for the `vendorNpmFiles` list.

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
      'angular-rules-engine/**/*.+(ts|js|js.map)'
    ]
  });
};
```

###system-config.js :: Mapping and Package Configuration
Add an entry to the map section. This will map the `angular-rules-engine` folder to the relative path. In our example below, all of the scripts will be available in using the url: `www.mysite.com/vendor/angular-rules-engine`. 

The rule engine contains (4) folders that contain the source of the rule engine:

+ action: The action folder contains a business action framework to isolate and execute business logic in specific units called `Actions`. If you are familiar with the pipeline operations of the [`@Component`](https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html) model in Angular 2, the Action class also has a pipeline of operations. These operations execute pre/post in relation to the actually business logic implemented in your concrete action. One of the operations executes the rules contained in the `ValidationContext`, if there are any rule violations the business logic in the `Action` is not executed. 
+ rules: The `rules` folder contains the Typecript classes to create custom rules. This folder also contains a set of implemented rules.
+ service: The `service` folder contains a set of helper classes to manage a single service request with services messages. The content of the messages would typically be supplied by the results of the rules and the business actions. 
+ validation: The `validation` folder contains the `ValidationContext` and infrastructure to manage the execution of business rules.

```js   
        /** Map relative paths to URLs. */
        var map = {
            'angular-rules-engine': 'vendor/angular-rules-engine'
        };
        /** User packages configuration. */
        var packages = {
            'angular-rules-engine/action': {
                format: 'cjs',
                defaultExtension: 'js',
                main: 'index.js'
            },
            'angular-rules-engine/rules': {
                format: 'cjs',
                defaultExtension: 'js',
                main: 'index.js'
            },
            'angular-rules-engine/service': {
                format: 'cjs',
                defaultExtension: 'js',
                main: 'index.js'
            },
            'angular-rules-engine/validation': {
                format: 'cjs',
                defaultExtension: 'js',
                main: 'index.js'
            }
        };
```
