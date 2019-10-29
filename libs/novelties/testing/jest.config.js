module.exports = {
  name: 'novelties-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/novelties/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
