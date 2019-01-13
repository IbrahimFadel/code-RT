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

app.get("/css/bootstrap.min.css", function(req, res) {
  res.sendFile(__dirname + "/css/bootstrap.min.css");
});

app.get("/fonts/Gravity-Book.otf", function(req, res) {
  res.sendFile(__dirname + "/fonts/Gravity-Book.otf");
});

app.get("/fonts/Gravity-Light.otf", function(req, res) {
  res.sendFile(__dirname + "/fonts/Gravity-Light.otf");
});

io.on("connection", function(socket) {
  console.log("User: " + socket.id + " has connected");
  let id = socket.id;
  socket.emit("sendId", id);
  let password = genPassword();
  socket.emit("sendPassword", password);

  socket.on("keyPressed", function(e) {
    console.log(e + " key pressed");
    socket.on("dataReceived", function(data, fn) {
      fn(data);
    });
  });
});

function genPassword() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

http.listen(8000, function() {
  console.log("listening on *:8000");
});
