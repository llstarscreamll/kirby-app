module.exports = {
  name: 'production-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/production/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
