import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const bundlePackages = ['query-string', 'decode-uri-component', 'filter-obj', 'split-on-first'];

const matchPackage = (id) => {
  return bundlePackages.some((pkg) => {
    return id.includes(pkg);
  });
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs({}),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
  ],
  external: (id) => /node_modules/.test(id) && !matchPackage(id),
};
