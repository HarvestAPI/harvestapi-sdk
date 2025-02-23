import { spawnSync } from 'child_process';
import fs from 'fs-extra';

fs.removeSync('dist');

spawnSync('rollup -c', { shell: true, stdio: 'inherit' });

setTimeout(() => {
  fs.copySync('dist/index.d.ts', 'dist/index.esm.d.ts');
  fs.copySync('dist/index.d.ts', 'dist/index.cjs.d.ts');
}, 1000);
