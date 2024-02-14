const express = require("express");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  //   res.send("Hello Chat");
  res.sendFile(__dirname + "/index.html");
});

// Socket
io.on("connection", (socket) => {
  console.log("User connected.");

  socket.on("message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});
