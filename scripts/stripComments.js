import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const candidateDirs = [
  join(process.cwd(), 'apps'),
  join(process.cwd(), 'packages'),
  join(process.cwd(), 'src'),
];

const targetDirs = candidateDirs.filter((dir) => existsSync(dir));
const ignoredFolders = new Set(['node_modules', '.next', 'dist', '.turbo', 'build', '.git']);

function getFiles(dir, files = []) {
  const list = readdirSync(dir);
  for (const file of list) {
    if (ignoredFolders.has(file)) continue;
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      const ext = extname(fullPath);
      if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

function stripComments(content) {
  let cleaned = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  cleaned = cleaned.replace(/^\s*\/\/.*$/gm, '');
  cleaned = cleaned.replace(/(?<!https?:)\s*\/\/[^\r\n]*/g, '');
  cleaned = cleaned.replace(/^\s*\{\s*\}\s*[\r\n]+/gm, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned;
}

function run() {
  for (const dir of targetDirs) {
    const files = getFiles(dir);
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      const stripped = stripComments(content);
      if (content !== stripped) {
        writeFileSync(file, stripped, 'utf8');
        console.log(`Cleaned: ${file}`);
      }
    }
  }
}

run();
