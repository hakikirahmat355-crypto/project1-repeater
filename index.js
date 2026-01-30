const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

console.log("📡 Repeater running on port", PORT);

wss.on("connection", (ws) => {
  console.log("📶 Radio connected");

  ws.on("message", (data) => {
    // broadcast ke semua client lain
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => {
    console.log("🔌 Radio disconnected");
  });
});

