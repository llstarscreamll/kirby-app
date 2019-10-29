module.exports = {
  name: 'employees-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/employees/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
