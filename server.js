// server.js
/**
 * Simple Node.js server with basic routing and JSON API
 */

const http = require('http');
const url = require('url');

// Simulate async data fetching
function getMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const message = "Hello from Node.js backend!";
      resolve(message);
    }, 500);
  });
}

// Create Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  // CORS headers (allow requests from any origin)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Preflight request
    res.writeHead(204);
    res.end();
    return;
  }

  if (pathname === '/api/message' && req.method === 'GET') {
    const message = await getMessage();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
  }
  else if (pathname === '/api/echo' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ youSent: data }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});

// End 
