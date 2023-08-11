const http = require("http");
const app = require("./route/routes");
const socket = require("socket.io");
const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, ()=> {
  console.log(`http://localhost:${port}`);
});

// for the chats
const io = socket(server, {
  cors: {
    origin: "https://csci4177-group-project-backend.onrender.com",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});