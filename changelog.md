# Release notes

## [v0.4.2 (2020-10-10)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4.2..v0.4.1)

### Fixed

- TimeClock: change entry/exit input form type from password to text due to estrange behavior with browser passwords.

## [v0.4.1 (2020-08-11)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4.1..v0.4)

### Fixed

- Issues with too long decimal values

## [v0.4 (2020-08-11)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4..v0.3)

### Added

- novelties: new ability to create balance novelty, create balance novelty from report by novelty type view, only those with certain permissions can access the new feature.
- novelties: new resume report by novelty types(llstarscreamll@hotmail.com)

### Changed

- many minor visual improvements

### Fixed

- Error with unresponsive pagination buttons on report by novelty type

## [v0.3 (2020-07-17)](https://github.com/llstarscreamll/angular-kirby/compare/v0.3..v0.2.1)

### Added

- employees: new ability to create employees

## [v0.2.1 (2020-07-17)](https://github.com/llstarscreamll/angular-kirby/compare/v0.2.1..v0.2)

### Fixed

- bug searching for cost centers on employees form.

## [v0.2 (2020-06-30)](https://github.com/llstarscreamll/angular-kirby/compare/v0.1..0.2)

### Added

- novelty types: new ui to create, update, search and delete
- novelties: in the report, all novelties are displayed even those that are not related to a time clock log, the groping attributes are by time clock log checkout date and fallback to novelty end date
- novelties: new advanced search form, novelties can be searched by range date (current month by default), novelty type, cost center and employees

## [v0.1 (2020-05-30)](https://github.com/llstarscreamll/angular-kirby/compare/v0.1..8b22a822e079cb3e222375da1dff72deb96844f1)

This is the first release involving minimal features for going to production.
The main goal is to provide a user interface to manage employees novelties
calculations based on time clock data:

### Feat

- authentication: login, logout, sign up
- time clock: check in/out, list/search time clock logs
- employees: list without search and update
- novelties: list/search, create many novelties, update and report by employee time clock
