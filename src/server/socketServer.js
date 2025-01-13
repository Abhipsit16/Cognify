const { Server } = require("socket.io");
const http = require("http");
const dbConnect = require('../lib/mongodb');
const User = require('../lib/models/User');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

dbConnect();

const clients = new Map();

io.on("connection", (socket) => {  
  // Join chat room
  socket.on('join_chat', (chatId) => {
    socket.join(chatId);
  });

  // Handle sending messages
  socket.on('send_message', (message) => {
    const { chatId, senderId, message: msg } = message;
    const roomMessage = { sender_id: senderId, message: msg, sent_at: new Date() };
    
    // Emit message to the room
    io.to(chatId).emit('receive_message', roomMessage);
  });

});

server.listen(3001, '0.0.0.0', () => {
  console.log("Socket.IO server running on port 3001");
});

