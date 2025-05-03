const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const authRoutes = require('./routes/authRoutes');
const { getData } = require('./models/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

// Socket.IO setup
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on('connection', () => {
    console.log("User connected");
});

app.get('/data', getData);

// Start server
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
