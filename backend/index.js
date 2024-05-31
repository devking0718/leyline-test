const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const http = require('http');
const app = express();
const cors = require("cors");

const server = http.createServer(app);
const io = require('socket.io')(server,  {
  cors: {
    origin: '*',
  }}
); // Attach socket.io to the server


const port = process.env.PORT || 8080;

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

const db = require("./models/");
// Sync models with database
db.sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});


require("./routers/index.routes")(app, io);
require("./controllers/websocket")(io);

// Start server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
