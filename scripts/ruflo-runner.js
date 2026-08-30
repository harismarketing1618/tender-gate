// RuFlo Orchestration Runner (v3.38)
// Starts RuFlo background daemon, Express API Backend, and Vite Frontend

import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

console.log('====================================================');
console.log('🛡️  RUFLO ENTERPRISE MULTI-AGENT ORCHESTRATION RUNNER');
console.log('====================================================\n');

// 1. Ensure RuFlo Daemon is running
try {
  console.log('⚙️  Step 1: Starting RuFlo Background Daemon...');
  execSync('ruflo daemon start', { stdio: 'inherit', cwd: ROOT_DIR });
} catch (e) {
  console.log('ℹ️  RuFlo daemon status check complete.');
}

// 2. Launch Express Backend Server on port 5000
console.log('\n🚀 Step 2: Launching Express Backend Server (Port 5000)...');
const backend = spawn('node', ['server/index.js'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true
});

// 3. Launch Vite Frontend Server on port 5173
console.log('⚡ Step 3: Launching Vite Frontend Server (Port 5173)...');
const frontend = spawn('npx', ['vite', '--host'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true
});

// Handle graceful shutdown
const cleanup = () => {
  console.log('\n🛑 Shutting down RuFlo orchestration services...');
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
