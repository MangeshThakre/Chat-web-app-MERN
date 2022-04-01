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
app.use(cors());

const port = process.env.PORT || 8081;
const io = socketIo(server);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/", router);

io.on("connection", (socket) => {
  console.log("connected", socket.id); // x8WIv7-mJelg7on_ALbx
  socket.on("join-room", (roomId, message) => {
    socket.join(roomId);
    console.log(message);
    socket.to(roomId).emit("receive-message", message);
    socket.emit("receive-message", message);
  });
});

io.on("disconnect", function (socket) {
  console.log("A user disconnected", socket.id);
});

server.listen(port, () => {
  console.log(`server listening at  http://localhost:${port}`);
});
