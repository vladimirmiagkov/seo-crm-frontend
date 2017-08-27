# SEO CRM (frontend)

## About project
SEO CRM for SEO specialists and clients.<br>
This is frontend part of the project.<br>
See: [Backend part](https://github.com/vladimirmiagkov/seo-crm)

What is this? (todo: write intro or video)

This is an attempt to completely rewrite the [old project](http://www.rsite.ru/en/lastprojects/crm-robot-automation-seo-promotion-sites)
with separated frontend and backend.<br>
??Highload.<br>
??Support: horizontal sharding (ElasticSearch)<br>

## Project status
Slow development, at free time.<br>
Features implemented: 15%

## Built With (current stack)

Frontend:
* [Angular 4](https://angular.io)

  tests:
  * [Protractor](http://www.protractortest.org/)
  * [Karma](https://karma-runner.github.io)

Backend:
* [Symfony 3](https://symfony.com)

  tests:
  * BDD [Behat](http://behat.org)
  * TDD [PhpSpec](http://www.phpspec.net)
  * [PhpUnit](https://phpunit.de)

Other:
* Docker: Easy environment.
* ElasticSearch: Big data. We store downloaded sites data here.
* Redis: Fast cache. Cross-process synchronization manager.
* PhantomJS: Remote Javascript browser. We download full copy of sites with Javascript support.



## Contributing

This project is an open source, community-driven project.

## Authors

* **Vladimir Miagkov** - *Initial work* - [RSITE DEVELOPMENT](http://www.rsitedevelopment.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Install

```
git clone https://github.com/vladimirmiagkov/seo-crm-frontend
```
```
cp src/environments/environment.prod.ts.dist src/environments/environment.prod.ts
```
In file `environment.prod.ts` set right `backendRoot` like `backendRoot: 'http://localhost'`

```
cp src/environments/environment.ts.dist src/environments/environment.ts
```
In file `environment.ts` set right `backendRoot` like `backendRoot: 'http://localhost'`

```
npm install
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
