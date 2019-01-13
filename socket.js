const socket = io();

var partnerTextArea = document.getElementById("partnerTextArea");
var clientTextArea = document.getElementById("clientTextArea");
var code = [];
var pairs = [];

socket.on("connection", function(socket) {
  console.log("hi");
  //let p = document.getElementById("clientId");
  //let id = newsocket.socket.sessionid;
  //console.log(id);
});

socket.on("sendId", function(id) {
  let p = document.getElementById("clientId");
  p.innerHTML += " " + id;
});

socket.on("sendPassword", function(password) {
  let p = document.getElementById("clientPassword");
  p.innerHTML += " " + password;
});

document.addEventListener("keydown", keyCheck);
function keyCheck(e) {
  code.push(e.key);
  let clientId = document.getElementById("clientId").innerHTML.slice(9, -1);
  for (let i = 0; i < pairs.length; i++) {
    //console.log(pairs[i][0].id);
    if (pairs[i][0].id == clientId) {
      console.log("Your Id has been found in pair: " + i);
    }
  }
  socket.emit("dataReceived", code, function(data) {
    createTextArea(data);
  });
  let char = String.fromCharCode(e.keyCode);
  switch (e.keyCode) {
    case 8:
      partnerTextArea.value = clientTextArea.value.slice(
        0,
        clientTextArea.value.length - 1
      );
      break;
    case 9:
      e.preventDefault();
      var start = e.selectionStart;
      var end = e.selectionEnd;
      clientTextArea.value = clientTextArea.value.substring(0, start) + "\t";
      partnerTextArea.value = partnerTextArea.value.substring(0, start) + "\t";
      break;
    case 13:
      partnerTextArea.value += "\n";
      break;
  }

  if (
    e.which != 8 &&
    e.which != 9 &&
    e.which != 13 &&
    e.which != 91 &&
    e.which != 18 &&
    e.which != 17 &&
    e.which != 16 &&
    e.which != 20 &&
    e.which != 37 &&
    e.which != 38 &&
    e.which != 39 &&
    e.which != 40
  ) {
    partnerTextArea.value += e.key;
  }

  socket.emit("keyPressed", e.key, function(error, message) {
    console.log(error + ": " + message);
  });
}

function createTextArea(data) {
  let parent = document.getElementById("partnerCode");
  element = document.getElementById("partnerTextArea");
  element.parentNode.removeChild(element);

  let newElement = document.createElement("textarea");
  newElement.id = "partnerTextArea";
  newElement.classList.add("textarea");
  newElement.disabled = true;
  newElement.readOnly = true;
  let text = "";
  for (let i = 0; i < data.length; i++) {
    text += data[i];
  }
  //console.log(text);
  newElement.value = text;
  parent.append(newElement);
}

function showConnectForm() {
  document.getElementById("connectForm").style.display = "block";
}

function connect() {
  partnerId = document.getElementById("partnerId").value;
  partnerPassword = document.getElementById("partnerPassword").value;

  clientId = document.getElementById("clientId").innerHTML.slice(9, -1);
  clientPassword = document.getElementById("clientPassword").innerHTML;

  let partner = {
    id: partnerId,
    password: partnerPassword
  };

  let client = {
    id: clientId,
    password: partnerPassword
  };

  let pair = [client, partner];

  pairs.push(pair);

  //console.log(clientPassword.slice(14, -1));

  return pairs;
}
