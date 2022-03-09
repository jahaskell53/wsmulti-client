"use strict";
exports.__esModule = true;
var socket_io_client_1 = require("socket.io-client");
var controllers_js_1 = require("./controllers.js");
var PlayerList_js_1 = require("./PlayerList.js");
//conects us to server. must be www bc i think we set up certificate with www
var socket = (0, socket_io_client_1.io)("https://www.vrwikitest.com:3000");
var INTERVAL = 50;
// on client slide, stores id when connecting to a server
var playerList; // declared for global scope
socket.on("connect", function () {
    console.log("you connected with id: ", socket.id);
    playerList = new PlayerList_js_1["default"](); // when you connnect, initialize a new player lst
});
// lsitens to client joined, and create player obj when a new client joins
socket.on("user-joined", function (socketId) {
    playerList.createNewPlayer(socketId);
});
// every few ms, send server a message with my updated obj
window.setInterval(function () {
    // get pos data of controllers and send them to server.
    socket.emit("update-to", (0, controllers_js_1.createMyObj)(socket.id), socket.id);
}, INTERVAL);
// when the client receives data from another client, update the array of client objects and the corrsp graphical representation.
socket.on("update-send", function (userObj, clientId) {
    playerList.updatePos(userObj, clientId);
});
socket.on('disconnect-send', function (clientId) {
    playerList.removePlayer(clientId);
});
