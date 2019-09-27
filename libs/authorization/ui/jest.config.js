module.exports = {
  name: 'authorization-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/authorization/ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
