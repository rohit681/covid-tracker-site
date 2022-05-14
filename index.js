const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
connectToMongo();
dotenv.config({ path: "./config.env" });

//middle ware

app.use(express.json());
app.use(require("./routes/auth"));

// const publicPath = path.join(__dirname, "public/");
// console.log(publicPath);
// app.get("*", function (request, response) {
//   response.sendFile(path.join(publicPath, "index.html"));
// });

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}

app.listen(port, () => {
  console.log(`iNotebook is lisitening at http://localhost:${port}`);
});
