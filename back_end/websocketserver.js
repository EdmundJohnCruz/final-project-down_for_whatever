const WebSocket = require('ws');
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server({ port: 6000 });

wss.on('connection', (ws) => {
  console.log('Someone has connected');
});

// This will just forward along all messages to all ws clients for now.
// We will send as our msg a json object which says what got updated, and
// let the client decide if they need to resend an http request back to the
// server to get things updated ect.
client.on('message', (channel, message) => {
  console.log(`subscriber hears message ${message}`);
  wss.clients.forEach((client) => {
    client.send(message);
  });
});

client.subscribe('wsMessage');