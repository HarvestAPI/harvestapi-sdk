import { spawnSync } from 'child_process';
import { resolve } from 'path';
import fs from 'fs-extra';

spawnSync('typedoc --exclude "**/*+(test|.spec|.e2e).ts"', { shell: true, stdio: 'inherit' });

const docPath = resolve('./gen-docs/README.md');

if (!fs.pathExistsSync(docPath)) {
  throw new Error(`Docs not generated at ${docPath}`);
}

const genDocsLines = fs
  .readFileSync(docPath, 'utf-8')
  .split('\n')
  .slice(7)
  .filter((l) => !l.startsWith('Defined in: ['));

const readmeDocs = fs.readFileSync(resolve('./docs/README.md'), 'utf-8');

fs.outputFileSync(
  resolve('./README.md'),
  readmeDocs +
    '\n' +
    genDocsLines
      .join('\n')
      .replace(/\]\(README\.md\#/g, '](#')
      .replace(/\n\n\n/g, '\n\n'),
);

fs.removeSync('./gen-docs');
