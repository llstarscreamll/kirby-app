module.exports = {
  name: 'users-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/users/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
