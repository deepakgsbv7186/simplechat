const socket = io();
let username;
let showUserName = document.querySelector(".brand");
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  username = prompt("Please enter your name.");
} while (!username);

showUserName.querySelector("h2").innerHTML = `Welcome, ${username}!`;
// showUserName.querySelector("h2").innerHTML = username ? username : "Anonymous";

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    username: username,
    message: message.trim(),
  };

  // append message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add(type, "message");

  let markup = `
    <h4>${msg.username}</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve message
socket.on("message", (msg) => {
  //   console.log(msg);
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
