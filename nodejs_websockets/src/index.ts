// Ping Pong App
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function(socket) {
  socket.on('error', console.error)
  console.log("Connection established! " + Math.random())

  socket.on('message', (e) => {
    if (e.toString().toLowerCase() === "ping") {
      socket.send("pong");
    } else {
      socket.send(e.toString());
    }
  })
})
