// get io from CDN
// import { io } from "socket.io-client";
import * as io from "https://unpkg.com/socket.io@4.4.1/dist/index.js";
import { createControllers, getMyObj } from "./Controllers.js";
import PlayerList from "./PlayerList.js";
//conects us to server. must be www bc i think we set up certificate with www
const socket = io();
// on client slide, show your id when you connect to a server
var myId; // declare id for global scope
var playerList; // declared for global scope
socket.on("connect", () => {
  console.log("you connected with id: ", socket.id);
  myId = socket.id; // store socket id into var, for sending with object later
  console.log("SOCKET ID: ", socket.id);
  console.log("SOCKET ID: ", myId);
  playerList = new PlayerList(); // when you connnect, initialize a new player lst
});

// lsitens to client joined, and create player obj when a new client joins
socket.on("user-joined", (socketId) => {
  playerList.createNewPlayer(socketId);
});

// every few ms, send server a message with my updated obj
window.setInterval(() => {
  try {
     // get pos data of controllers and send them to server.
  console.log("id sent every second: ", myId);
  console.log("object sent every second: ", getMyObj(myId));
    socket.emit("update-to", getMyObj(myId));
  }
  catch(error) {
    console.log(error)
  }

}, 500);

// when the client receives data from another client, update the array of client objects and the corrsp graphical representation.
socket.on("update-send", (userObj) => {
  console.log("received something on send-controller");
  // updates the pos in the array and the corresponding graphical representation
  console.log("update pos user object: ", userObj)
  playerList.updatePos(userObj);
});
