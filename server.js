var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/socket.js", function(req, res) {
  res.sendFile(__dirname + "/socket.js");
});

app.get("/css/index.css", function(req, res) {
  res.sendFile(__dirname + "/css/index.css");
});

app.get("/fonts/Gravity-Book.otf", function(req, res) {
  res.sendFile(__dirname + "/fonts/Gravity-Book.otf");
});

app.get("/fonts/Gravity-Light.otf", function(req, res) {
  res.sendFile(__dirname + "/fonts/Gravity-Light.otf");
});

io.on("connection", function(socket) {
  console.log("User: " + socket.id + " has connected");
  socket.on("keyPressed", function(e) {
    console.log(e + " key pressed");
  });
});

http.listen(8000, function() {
  console.log("listening on *:8000");
});
