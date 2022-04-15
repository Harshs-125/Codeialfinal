const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("./config/mongoose");
app.use(cors({}));
app.use(bodyParser.json());
app.use(express.urlencoded());
const http = require("http");
const chatServer = http.createServer(app);
const chatSockets = require("./config/chat_socket").chatSockets(chatServer);
chatServer.listen(process.env.PORT2 || 5000);
console.log("chatServer is listening on process.env.PORT2 || 5000");
app.get("/", (req, res) => {
  res.send("SEND");
});
app.use("/", require("./routes"));

app.listen(process.env.PORT || 8000, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
  } else {
    console.log(`successfully connected to port: ${process.env.PORT || 8000}`);
  }
});
