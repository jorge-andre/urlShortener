// Require express module
const express = require("express");
const app = express();
const PORT = 7000;
const mongoURI = "mongodb://localhost/url-shortner";
const mongoose = require("mongoose");
require("./models/ShortenUrl");
require("./routes/shortenurl")(app);
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
};

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
  if (err) console.log(`Error`, er);
  console.log(`Connected to MongoDB`);
});

//Start server on Port 7000
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});