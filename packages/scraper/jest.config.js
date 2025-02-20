export default {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
            decorators: true,
          },
          target: 'es2020',
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  transformIgnorePatterns: [], // Transpile everything, including node_modules
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testMatch: ['**/*.test.ts'],
  testTimeout: 60 * 1000,
  maxConcurrency: 10,
};
