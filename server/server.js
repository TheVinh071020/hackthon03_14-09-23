// Khởi tạo server
const express = require("express");
const server = express();
// Require các packages cần thiết
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

// SD các packages
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// import routes
const workRoute = require("./routes/works.routes");

server.use("/api/v1/works", workRoute);

server.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
