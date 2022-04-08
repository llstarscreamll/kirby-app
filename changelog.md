# Release notes

## [1.3.0 (2022-04-08)](https://github.com/llstarscreamll/angular-kirby/compare/1.3.0..1.2.0)

### Added

- New "purpose" attribute to instruct if a production log purpose is for sales or consumption, the field is searchable

## [1.2.0 (2022-03-09)](https://github.com/llstarscreamll/angular-kirby/compare/1.2.0..1.1.1)

### Added

- new _tag date_ attribute, the attr is displayed on the edit form as help text below to the Tag field and instructs when a tag has changed
- new production report page with filters and Kgs by products bar chart
- show errors when update production log has failed
- filter production logs and production report by cost centers instead of sub cost centers
- new ability to filter production logs by tag date and remove filters by creation date

### Changed

- format net weight number on search production logs results
- errors section now has red color to emphasize the message
- change the way permissions are verified to enable the global novelties search
- production logs can be searched by many employees, many machines, many products, many tags and many sub cost centers
- improve production log ticket print visual styles

## [1.1.1 (2021-12-21)](https://github.com/llstarscreamll/angular-kirby/compare/1.1.1..1.1.0)

fix: visual errors on ticket print design

## [1.1.0 (2021-11-24)](https://github.com/llstarscreamll/angular-kirby/compare/1.1.0..1.0.0)

### Added

- New production logs search form
- New ability to edit production log
- New ability to download all production logs or the filtered ones onn search form
- New ability to tagging production logs as Inline, Error and Rejected; tag can't be set at creation time (defaults to 'InLine') but can be updated

### Changed

- On production logs list table show creation date, machine short name and net weight measure unit
- On production logs list table records are highlighted based on tag attribute
- Many stability and security improvements
- Improve production log ticket print design

### Fixed

- Fix error with production logs table list pagination

## [1.0.0 (2021-09-05)](https://github.com/llstarscreamll/angular-kirby/compare/1.0.0..v0.8)

### Added

- Production: new web module and Linux desktop app for managing production logs, the desktop app o capable to connect to weighing machines by serial ports and print tickets with a fixed design that includes a barcode to physical printers connected via USB. This new functionality relies on employees, machines, products and customers data to create production logs. Data can be exported to csv.

## [v0.8 (2021-01-21)](https://github.com/llstarscreamll/angular-kirby/compare/v0.8..v0.7)

### Added

- novelties: remove employee search control on resume by novelty type report based on ACL rules

## [v0.7 (2021-01-20)](https://github.com/llstarscreamll/angular-kirby/compare/v0.7..v0.6)

### Changes

- Novelties: hide employee form control on report by employee when user doesn't have global search permission

## [v0.6 (2020-12-28)](https://github.com/llstarscreamll/angular-kirby/compare/v0.6..v0.5)

### Added

- novelties: new link to export resume by novelty type from all employees to csv

## [v0.5 (2020-11-11)](https://github.com/llstarscreamll/angular-kirby/compare/v0.5..v0.4.3)

### Added

- time clock: add title with date intervals on novelties associated to time clock log
- novelties: add novelty start and end dates as tooltip on report by employee table
- time clock: new user ability to see only his own time clock log records based in his permissions
- novelties: new user ability to see only his own novelties records based in his permissions
- employees: new ability to search employees on list page
- employees: many minor visual improvements
- work shifts: new work shifts manager (list, search, create, update and trash)
- novelty types: check for permissions to show some ui elements

### Fixed

- work shifts: error updating days when a work shift applies
- work shifts: errors are not removed after success operations
- shared: error disabling next button on pagination component

## [v0.4.3 (2020-10-19)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4.3..v0.4.2)

### Fixed

- Employees: add attribute 'phone_prefix' in employees form with '+57' as default value.

## [v0.4.2 (2020-10-10)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4.2..v0.4.1)

### Fixed

- TimeClock: change entry/exit input form type from password to text due to estrange behavior with browser passwords.

## [v0.4.1 (2020-08-11)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4.1..v0.4)

### Fixed

- Issues with too long decimal values

## [v0.4 (2020-08-11)](https://github.com/llstarscreamll/angular-kirby/compare/v0.4..v0.3)

### Added

- novelties: new ability to create balance novelty, create balance novelty from report by novelty type view, only those with certain permissions can access the new feature.
- novelties: new resume report by novelty types

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
