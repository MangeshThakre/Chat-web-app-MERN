require("dotenv/config");
require("./database.js");
const Pusher = require("pusher");
const express = require("express");
const app = express();
const http = require("http");
const router = require("./routes/codeeditorRouter.js");
const socketIo = require("socket.io");
const server = http.createServer(app);
const path = require("path");
const mongoose = require("mongoose");

const cors = require("cors");
const { disconnect } = require("process");
app.use(cors());
const port = process.env.PORT || 8081;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/", router);

//----------------------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("app is runing successfully");
  });
}
//----------------------------
app.listen(port, () => {
  console.log(`server listening at  http://localhost:${port}`);
});

const pusher = new Pusher({
  appId: "1382742",
  key: "e9c08f4eba776e45b9af",
  secret: "b9b161853cb878471a7b",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  const chatmodel = db.collection("chatmodels");
  const changeStream = chatmodel.watch();
  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      pusher.trigger("receive-message", "inserted", {
        receiveMessage: change.fullDocument,
      });
    } else {
      console.log("ERROR");
    }
  });
});
