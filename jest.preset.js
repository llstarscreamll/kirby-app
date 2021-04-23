const nxPreset = require('@nrwl/jest/preset');
module.exports = {
  ...nxPreset,
  verbose: false,
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['lcov'],
};
