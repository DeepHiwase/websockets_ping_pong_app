// Ping Pong App
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function(socket) {
  socket.on('error', console.error)
  let connectionID = Math.random()
  console.log("Connection established! " + connectionID)

  socket.on('message', (e) => {
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        if (e.toString().toLowerCase() === "ping") {
          client.send("pong");
        } else {
          client.send(e.toString());
        }
      }
    })
    // if (e.toString().toLowerCase() === "ping") {
    //   socket.send("pong");
    // } else {
    //   socket.send(e.toString());
    // }
  })

  socket.on('close', () => {
    console.log("Client disconnected " + connectionID)
  })
  
})
