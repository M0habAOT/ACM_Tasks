const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log('Connected to server', Date.now() / 1000);
  ws.send('Hello Server!', Date.now() / 1000);
});

ws.on('message', (message) => {
  console.log('Server says:', message.toString(), Date.now() / 1000);
});