const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const port = 8000;
const proxy = httpProxy.createProxyServer({ ws: true, changeOrigin: false, xfwd: false, followRedirects: true });
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url);
  proxy.web(req, res, { target: `${reqUrl.protocol}//${reqUrl.host}` });
});

console.log("Proxy listening on port", port)
server.listen(port);
