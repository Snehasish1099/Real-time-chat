const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

//Socket
const io = require("socket.io")(server);

app.use(express.static(__dirname+"/public"));

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});


const PORT = process.env.PORT || 3000
server.listen(
    PORT, () => {
        console.log(`Listening to port ${PORT}`);
    })