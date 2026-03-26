const path = require('path');
const http = require('http');
const { parse } = require('url');
const next = require('next');

const app = next({
  dev: false,
  dir: __dirname
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 8080, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log('> Server ready on port', process.env.PORT || 8080);
  });
});