const http = require("http");
const app = require("./route/routes");
const socket = require("socket.io");
const port = process.env.port || 3001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// Referred to the youtube video on how to use socket.io for real time commjunication and partially used the code after understanding
// URL1: https://www.youtube.com/watch?v=otaQKODEUFs&t=13178s&ab_channel=KishanSheth
// URL2: https://github.com/koolkishan/chat-app-react-nodejs
// Date Accessed: 07/26/2023
// Used by Parth Patel
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
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
