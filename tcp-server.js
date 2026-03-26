const path = require('path');
const fs = require('fs');

// Log everything for debugging
const logFile = path.join(__dirname, 'debug.log');
fs.writeFileSync(logFile, JSON.stringify({
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  NODE_ENV: process.env.NODE_ENV,
  allEnv: Object.keys(process.env)
}, null, 2));

const port = parseInt(process.env.PORT, 10);
process.env.PORT = (!port || isNaN(port)) ? '3000' : String(port);
process.env.HOSTNAME = '0.0.0.0';

require(path.join(__dirname, '.next', 'standalone', 'server.js'));