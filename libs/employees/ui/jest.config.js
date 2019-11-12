module.exports = {
  name: 'employees-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/employees/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
