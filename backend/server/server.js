require("dotenv/config");
require("./database.js");
const express = require("express");
const router = require("./routes/codeeditorRouter.js");
const app = express();
const port = process.env.PORT || 8081;
const cors = require("cors");
const bodyparser = require("body-parser");
app.use(cors());
app.use("/", router);
app.listen(port, () => {
  console.log(`server listen at  http://localhost:${port}`);
});
