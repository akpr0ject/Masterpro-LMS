import { access, constants } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const viteCliPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const distIndexPath = path.join(process.cwd(), 'dist', 'index.html');

async function pathExists(filePath, mode = constants.F_OK) {
  try {
    await access(filePath, mode);
    return true;
  } catch {
    return false;
  }
}

if (await pathExists(viteCliPath)) {
  const build = spawn(process.execPath, [viteCliPath, 'build'], {
    stdio: 'inherit',
  });

  build.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    process.exit(code ?? 1);
  });
} else if (await pathExists(distIndexPath)) {
  console.warn('Vite is not installed in this checkout; using the existing dist output.');
} else {
  console.error('Vite is not installed and no dist output exists. Run npm install before building.');
  process.exit(127);
}
