import { createMyObj } from "./Controllers.js";
import PlayerList from "./PlayerList.js";
//conects us to server. must be www bc i think we set up certificate with www
const socket = io("https://www.vrwikitest.com:3000");
// on client slide, stores id when connecting to a server
var playerList; // declared for global scope
socket.on("connect", () => {
  console.log("you connected with id: ", socket.id);
  playerList = new PlayerList(); // when you connnect, initialize a new player lst
});

// lsitens to client joined, and create player obj when a new client joins
socket.on("user-joined", (socketId) => {
  playerList.createNewPlayer(socketId);
});

// every few ms, send server a message with my updated obj
const interval = 50;
window.setInterval(() => {
  try {
    // get pos data of controllers and send them to server.
    socket.emit("update-to", createMyObj(socket.id));
  } catch (error) {
    console.error("failed to get object from id: ", error);
  }
}, interval);

// when the client receives data from another client, update the array of client objects and the corrsp graphical representation.
socket.on("update-send", (userObj, clientId) => {
  // updates the pos in the array and the corresponding graphical representation
  playerList.updatePos(userObj, clientId);
});
