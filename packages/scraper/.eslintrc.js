const rootOptions = require('../../.eslintrc.js');
module.exports = {
  ...rootOptions,
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
