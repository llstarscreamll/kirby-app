module.exports = {
  name: 'novelty-types-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/novelty-types/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
