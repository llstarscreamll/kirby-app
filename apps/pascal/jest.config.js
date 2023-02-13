module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/pascal/',
  setupFilesAfterEnv: ['<rootDir>src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  displayName: 'pascal',
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' },
};
