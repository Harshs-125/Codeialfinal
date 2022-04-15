const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://admin-Harsh:mysispalak@cluster0.22ht8.mongodb.net/codiel_development?retryWrites=true&w=majority`
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error connecting to mongodb"));

db.once("open", function () {
  console.log("Connected to database successfully:mongodb");
});
module.exports = db;
