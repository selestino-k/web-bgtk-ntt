const path = require('path');

// Ensure PORT is always a valid number for Passenger/cPanel
const port = parseInt(process.env.PORT, 10);
process.env.PORT = (!port || isNaN(port) || port <= 0 || port >= 65536) ? '3000' : String(port);
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Point to the Next.js standalone server
require(path.join(__dirname, '.next', 'standalone', 'server.js'));