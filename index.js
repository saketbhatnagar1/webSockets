const { Server } = require("socket.io");

const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app); //creating a new isntance for http server
const io = new Server(server); //pass the http server to this

//sockt connection::

io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log("A new user Message", message);

    io.emit("message", message); //emit the message we recieved from client to others
  });

  //socket comes with a id,socket is aobject
});
//whenever a connection is made we will receive a connection
//we will recieve a client and socket is the client ans socket will have information

//Socket .io will be handeled with io

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

//express will handle http and io will handle Socket

server.listen(9000, () => console.log(`server started at 9000`));
