import { createMySendData } from "./controllers.js";
import PlayerList from "./PlayerList.js";
// import "dotenv/config";

const SERVER_URL = "https://www.vrwikitest.com:3000";
const INTERVAL = 50;

const socket = io(SERVER_URL);
var playerList; // declared for global scope
socket.on("connect", () => {
  console.log("you connected with id: ", socket.id);
  playerList = new PlayerList();
});

// create player obj when a new client joins
socket.on("user-joined", (socketId) => {
  playerList.createNewPlayer(socketId);
});

// constantly update send server new pos data
window.setInterval(() => {
  socket.emit("update-to", createMySendData(socket.id), socket.id);
}, INTERVAL);

socket.on("update-send", (userObj, clientId) => {
  playerList.updatePos(userObj, clientId);
});

socket.on("disconnect-send", (clientId) => {
  playerList.removePlayer(clientId);
});
