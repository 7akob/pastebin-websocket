const WebSocket = require('ws');
require('dotenv').config();

// Replace with your actual token or set TOKEN in .env
const token = process.env.TOKEN || 'your-token-here';
const ws = new WebSocket(`ws://localhost:5000?token=${token}`);

ws.on('open', function open() {
    console.log('✅ Connected to WebSocket server');
    
    // Send a test message
    ws.send('Hello from Node.js test client!');
    
    // Send another message after 2 seconds
    setTimeout(() => {
        ws.send('This is a second test message');
    }, 2000);
    
    // Close connection after 5 seconds
    setTimeout(() => {
        console.log('🔒 Closing connection...');
        ws.close();
    }, 5000);
});

ws.on('message', function message(data) {
    console.log('📨 Received:', JSON.parse(data.toString()));
});

ws.on('close', function close() {
    console.log('❌ Connection closed');
});

ws.on('error', function error(err) {
    console.log('🚨 Error:', err.message);
});