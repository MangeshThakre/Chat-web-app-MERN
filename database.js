const mongoose = require("mongoose");
require("dotenv/config");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("connected to database"))
  .catch((e) => {
    console.log("Error", e);
  });
module.exports = mongoose;
