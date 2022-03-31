require("dotenv/config");
require("./database.js");
const express = require("express");
const app = express();
const http = require("http");
const router = require("./routes/codeeditorRouter.js");
const socketIo = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 8081;
const io = socketIo(server);

app.use("/uploads", express.static("public"));
app.use(express.static("public"));
app.use("/", router);

io.on("connection", (socket) => {
  console.log("connected"); // x8WIv7-mJelg7on_ALbx
  socket.on("join-room", (roomId, message) => {
    socket.join(roomId);
    socket.to(roomId).emit("receive-message", message);
  });
});

server.listen(port, () => {
  console.log(`server listen at  http://localhost:${port}`);
});
