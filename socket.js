const socket = io();

var partnerTextArea = document.getElementById("partnerTextArea");
var clientTextArea = document.getElementById("clientTextArea");

document.addEventListener("keydown", keyCheck);
function keyCheck(e) {
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
