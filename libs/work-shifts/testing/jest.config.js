module.exports = {
  name: 'work-shifts-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/work-shifts/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
