const { time } = require('console');
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('WebSocket server running on ws://localhost:8080');
});

wss.on('connection', (ws) => {
  console.log('New client connected', Date.now() / 1000);
  // Listen for messages from this client
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString(), Date.now() / 1000);
    ws.send(`You said: ${message}`, Date.now() / 1000);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});