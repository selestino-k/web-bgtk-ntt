"use strict";

// Disable undici WebAssembly HTTP parser — blocked by CloudLinux
process.env.NODE_NO_WARNINGS = '1';
delete globalThis.fetch;
delete globalThis.WebAssembly;

const path = require('path');
const fs = require('fs');

// ─── Log file setup ────────────────────────────────────────────────────────────
const logFile = path.join(__dirname, 'app.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

function log(message, data) {
  const timestamp = new Date().toISOString();
  const line = data
    ? `[${timestamp}] ${message} ${JSON.stringify(data)}\n`
    : `[${timestamp}] ${message}\n`;

  process.stdout.write(line);   // still show in cPanel log viewer
  logStream.write(line);        // also write to app.log
}

function logError(message, err) {{
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ERROR: ${message}\n${err?.stack || err}\n`;

  process.stderr.write(line);
  logStream.write(line);
}}

try {
  const stats = fs.statSync(logFile);
  if (stats.size > 5 * 1024 * 1024) {
    const rotated = path.join(__dirname, `app.${Date.now()}.log`);
    fs.renameSync(logFile, rotated);
    log(`Log rotated to ${rotated}`);
  }
} catch (e) {
    log('[wrapper] No existing log file or error checking log file size:', e.message);
  }  

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

const standaloneDir = path.join(__dirname, '.next', 'standalone');
process.chdir(standaloneDir);

log('[wrapper] Starting Next.js standalone server...');
log('[wrapper] Working directory:', { cwd: process.cwd() });
log('[wrapper] Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
});

const memUsage = process.memoryUsage();
log('[wrapper] Initial memory:', {
  rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB',
  heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
  heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
});

setInterval(() => {
  const mem = process.memoryUsage();
  log('[wrapper] Memory usage:', {
    rss: Math.round(mem.rss / 1024 / 1024) + 'MB',
    heapUsed: Math.round(mem.heapUsed / 1024 / 1024) + 'MB',
    heapTotal: Math.round(mem.heapTotal / 1024 / 1024) + 'MB',
  });
}, 60 * 1000);

process.on('uncaughtException', (err) => {
  logError('[wrapper] Uncaught exception', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logError('[wrapper] Unhandled rejection', reason);
  process.exit(1);
});

process.on('SIGTERM', () => {
  log('[wrapper] SIGTERM received, shutting down gracefully...');
  logStream.end();
  process.exit(0);
});

process.on('SIGINT', () => {
  log('[wrapper] SIGINT received, shutting down gracefully...');
  logStream.end();
  process.exit(0);
});

try {
  require('./.next/standalone/server.js');
  log('[wrapper] Standalone server loaded successfully');
} catch (err) {
  logError('[wrapper] Failed to load standalone server', err);
  process.exit(1);
}