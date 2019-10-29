module.exports = {
  name: 'novelty-types-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/novelty-types/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
