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
  console.log("A user connected");

  // Register the client with the socket
  socket.on("register", async (userId, username) => {
    try {
      // Update the user's socketId in the database
      const user = await User.findById(userId);
      if (user) {
        user.socketId = socket.id;
        await user.save();
        console.log(`User ${username} connected with socketId: ${socket.id}`);
      }
    } catch (error) {
      console.error("Error registering socket:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const [clientId, socketId] of clients.entries()) {
      if (socketId === socket.id) {
        clients.delete(clientId);
        console.log(`User removed: ${clientId}`);
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});
