module.exports = {
  name: 'novelty-types-ui',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/novelty-types/ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
