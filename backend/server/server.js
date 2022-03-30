require("dotenv/config");
require("./database.js");
const express = require("express");

const app = express();

const http = require("http").Server(app);
const router = require("./routes/codeeditorRouter.js");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 8081;
const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const bodyparser = require("body-parser");
app.use("/", router);

io.on("connection", (socket) => {
  console.log("connected"); // x8WIv7-mJelg7on_ALbx
  socket.on("join-room", (roomId) => {
    console.log(roomId);
    socket.join(roomId);
  });
});

http.listen(port, () => {
  console.log(`server listen at  http://localhost:${port}`);
});
