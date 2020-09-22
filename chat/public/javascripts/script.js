

const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  var contenido = ""
  for(let i = 0; i < data.length; i++){
    dato = data[i].split(",");
    message = dato[0];
    author = dato[1];
    contenido += "<p><b>"+author+"</b>:" +message+"</p>";
  }
  document.getElementById("messages").innerHTML = contenido;

};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message").value;
  var author = document.getElementById("author").value;
  if(/[a-zA-Z]+ [a-zA-Z]+$/.test(author)){
    data = [message,author];
    ws.send(data);
    data = "";
    
  }
  else{
    alert("Author invalido deber ser Nombre Apellido");
    data = "";
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);