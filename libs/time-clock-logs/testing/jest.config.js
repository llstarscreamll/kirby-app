module.exports = {
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/time-clock-logs/testing',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'time-clock-logs-testing',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
