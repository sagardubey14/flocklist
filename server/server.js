const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const authRoutes = require('./routes/authRoutes');
const wishRoutes = require('./routes/wishRoutes');
const { getData, getUserWishes } = require('./models/db');

const userSocketMap = new Map();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/wish', wishRoutes)

const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    const userId = Number(socket.handshake.query.id);
    userSocketMap.set(userId, socket.id);
    const extra = getUserWishes(userId)
    socket.on('wishlist:create', (newWishlist) => {
        const updatedWishlist = {...newWishlist, sharedWith:[...newWishlist.sharedWith, extra]}
        newWishlist.sharedWith.forEach(user => {
            const targetSocketId = userSocketMap.get(user.id);
            console.log(targetSocketId);
            if (targetSocketId) {
                io.to(targetSocketId).emit('wishlist:created', updatedWishlist);
            }
        });
    });

    socket.on('wishlist:update', (updatedWishlist) => {
        console.log(updatedWishlist);
        
        updatedWishlist.sharedWith.forEach(user => {
            if(user.id !== userId){
            const targetSocketId = userSocketMap.get(user.id);
            if (targetSocketId) {
                io.to(targetSocketId).emit('wishlist:updated', updatedWishlist);
            }
            }
        });
    });

    socket.on('wishlist:delete', ({wishlistId, sharedWith}) => {
        console.log(wishlistId, sharedWith);
        
        sharedWith.forEach(user => {
            const targetSocketId = userSocketMap.get(user.id);
            if (targetSocketId) {
                io.to(targetSocketId).emit('wishlist:deleted', wishlistId);
            }
        });
    });

    socket.on('disconnect', () => {
        for (let [key, value] of userSocketMap) {
            if (value === socket.id) {
                userSocketMap.delete(key);
                break;
            }
        }
    });
});

app.get('/data', getData);

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
