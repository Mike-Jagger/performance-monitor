const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const osu = require('node-os-utils');
const puppeteer = require('puppeteer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));

app.use(cors({
    origin: "http://localhost:3001"
}));

// Buffer to store the last 20 data points
let performanceDataBuffer = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    // Send the last 20 data points to the new client
    socket.emit('performanceDataInit', performanceDataBuffer);

    const monitorPerformance = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        setInterval(async () => {
            const cpuUsage = await osu.cpu.usage();
            const memUsage = await osu.mem.info();
            const metrics = await page.metrics();
            const heapSpace = metrics.JSHeapUsedSize;

            const dataPoint = {
                cpuUsage,
                memUsage: memUsage.usedMemMb,
                heapSpace,
                timestamp: new Date().toISOString(),
            };

            // Add new data point to the buffer
            performanceDataBuffer.push(dataPoint);

            // Keep only the last 20 data points
            if (performanceDataBuffer.length > 20) {
                performanceDataBuffer.shift();
            }

            console.log(cpuUsage);

            // Emit the new data point to the client
            socket.emit('performanceData', dataPoint);
        }, 5000); // Adjust the interval as needed
    };

    monitorPerformance();

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});