const WebSocket = require('ws');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const wss = new WebSocket.Server({ port: PORT });
const clients = new Set();

wss.on('connection', (ws, req) => {
    console.log('Client connected!');

    const urlParams = new URLSearchParams(req.url.slice(1));
    if (urlParams.get('token') !== process.env.TOKEN) {
        console.log("Invalid token: " + urlParams.get('token'));
        ws.send(JSON.stringify({
            status: 1,
            msg: 'ERROR: invalid token.'
        }));
        ws.close();
    }
    if (!clients.has(ws)) {
        console.log("New client connected!");
        clients.add(ws);
    }

    ws.on('message', (message) => {
        console.log('Recived message: ', message);

        clients.forEach(client => {
            ws.send(JSON.stringify({
                status: 0,
                msg: String(message)
            }));
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    })
});