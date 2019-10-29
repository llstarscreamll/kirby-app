module.exports = {
  name: 'time-clock-logs-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/time-clock-logs/testing',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
