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
  /* 

  Right now this code is not directly useful, but keep it here, it might be worthy
  //This shall get triggered on the very moment of 
  // console.log("A user connected", socket.id);

  // // Register the client with the socket
  // socket.on("register", async (userId, username) => {
  //   try {
  //     // Update the user's socketId in the database
  //     const user = await User.findById(userId);
  //     if (user) {
  //       user.socketId = socket.id;
  //       await user.save();
  //       console.log(`User ${username} connected with socketId: ${socket.id}`);
  //     }
  //   } catch (error) {
  //     console.error("Error registering socket:", error);
  //   }
  // });

  // socket.on("clicked", ()=>{
  //   console.log("clicked", socket.id)
  // }) 

  // socket.on('userData', (userData) => {
  //   console.log('Received user data:', userData);
  //   // You can now use the user data (e.g., store it, process it, etc.)
    
  //   // Example: Send a confirmation back to the client
  //   socket.emit('userDataReceived', { message: 'User data received successfully' });
  // });

  // socket.on("disconnect", () => {
  //   console.log("User disconnected:", socket.id);
  //   for (const [clientId, socketId] of clients.entries()) {
  //     if (socketId === socket.id) {
  //       clients.delete(clientId);
  //       console.log(`User removed: ${clientId}`);
  //       break;
  //     }
  //   }
  // });

  */

  //also we must make a function for creation of roomId, I prefer using a combination of Id's of both users now
  //code for conversation
  socket.on('roomMessageEmitted',(roomId, roomMessage)=>{
    socket.to(roomId).emit('roomMessageRecieved', roomMessage);
  })

  // on client side, we will use a roomMessageRecieved function to implement the response of client in chatroom, 
  // like saving his messages in his chats etc.
  // and rendering them
});

server.listen(3001, () => {
  console.log("Socket.IO server running on port 3001");
});

