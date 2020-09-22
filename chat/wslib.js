const WebSocket = require("ws");
const Message = require('./models/message');
const clients = [];
var messages = [];

const cargarMensajes = () =>{
  Message.findAll().then((result) =>{  
    for(let i = 0; i < result.length; i++){
      dato = result[i].message + ","+ result[i].author;
      messages.push(dato);
    }
  });

};  
cargarMensajes();
const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      data = message.split(",");
      Message.create({ message: data[0], author: data[1] }).then(() => console.log("Mensaje Guardado"));
      messages.push(message);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => {
      client.send(JSON.stringify(messages))});
  };
};

exports.wsConnection = wsConnection;