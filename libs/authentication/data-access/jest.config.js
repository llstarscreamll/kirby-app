module.exports = {
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/authentication/data-access',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'authentication-data-access',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
