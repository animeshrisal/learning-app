import WebSocket, { Server } from "ws";
import { Server as HttpServer } from "http";
let websocketServer: Server;

export const socket = (expressServer: HttpServer): void => {
  websocketServer = new WebSocket.Server({
    noServer: true,
  });

  websocketServer.on("connection", (socket: WebSocket) => {
    socket.on("message", () => {});
    socket.on("disconnect", () => console.log("AAAA"));
  });

  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });
};

export const adminMessage = () => {
  console.log(websocketServer.clients);
  websocketServer.clients.forEach(function each(client) {
    client.send("aaaa");
  });
};
