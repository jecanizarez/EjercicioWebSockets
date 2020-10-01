const WebSocket = require("ws");
const controller = require("./controller/controller");
const clients = [];
var messages = [];

const cargarMensajes = async () =>{
  allMessages = await controller.getMessages();
  messages = allMessages;
};  
cargarMensajes();
const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", async (message) => {
      data = message.split(",");
      obj = { content: data[0], author: data[1] }
      await controller.insertMessage(obj);
      messages.push(obj);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => {
      client.send(JSON.stringify(messages))});
  };
};

exports.wsConnection = wsConnection;