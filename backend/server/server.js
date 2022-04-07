require("dotenv/config");
require("./database.js");
const express = require("express");
const app = express();
const http = require("http");
const router = require("./routes/codeeditorRouter.js");
const socketIo = require("socket.io");
const server = http.createServer(app);
const path = require("path");

const cors = require("cors");
const { disconnect } = require("process");
app.use(cors());
const port = process.env.PORT || 8081;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/", router);

server.listen(port, () => {
  console.log(`server listening at  http://localhost:${port}`);
});

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
var userIDs = [];

io.on("connection", (socket) => {
  console.log(`connected socket.io`);

  socket.on("setup", (user) => {
    socket.user = user;
    console.log("online-user", socket.user._id);
    socket.emit("online-users", userIDs);
  });

  socket.on("send_message", (message) => {
    console.log(message);
    socket.broadcast.emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    socket.removeAllListeners("connection");
    socket.removeAllListeners("send_message");
  });
});

