module.exports = {
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/users/testing',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'users-testing',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
