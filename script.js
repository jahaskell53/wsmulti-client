// get io from CDN
// import { io } from "socket.io-client";
// import { io } from "https://unpkg.com/socket.io@4.4.1/dist/index.js";
import { createControllers, getMyObj } from "./Controllers.js";
import PlayerList from "./PlayerList.js";
//conects us to server. must be www bc i think we set up certificate with www
const socket = io("https://www.vrwikitest.com:3000");
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

// socket.on('tweet', (tweet) => {
//   // Our response
//   const tweetball = document.createElement('a-sphere');
//   tweetball.setAttribute("radius", `0.1`);
//   tweetball.setAttribute("color", `#FFFFF`);
//   console.log("tweetball received: ");
// });

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

const fakeData = ["The best way to learn about something is to do it yourself!", 
  "Don't be afraid to ask for help when you need it",
  "Learning is a lifelong process, so never stop learning!",
  "Be yourself and don't let anyone else tell you what to do.",
  "Don't be afraid to take risks, because they can lead to great things!",
  "Be kind to others and they will be kind to you.",
  "You can't please everyone, so don't try!",
  "Follow your dreams and you'll achieve great things!",
  "Be positive, because a negative attitude will only bring you down.",
  "Take time for yourself and relax, because you deserve it!",
  "Don't be afraid to speak your mind, because others will appreciate it!",
  "Believe in yourself and you can do anything!",
  "Embrace change, because it's a part of life!",
  "Be grateful for what you have, because there are people who don't have anything at all.",
  "Help others whenever you can and make the world a better place!",
  "Stay positive during tough times and know that things will get better soon!",
  "Don't be afraid to stand up for what you believe in, even if it means standing alone.",
  "Appreciate the small things in life, because they're what make life worth living!",
  "Laugh whenever you can, because it makes life a lot more fun!",
  "Be yourself and don't try to be someone that you're not, because people will see through it eventually.",
  "Give 110% in everything that you do, because it's the only way to achieve your goals!",
  "Be patient and never give up on your dreams, they will come true someday!",
  "Do something good for someone every day, even if it's just a small gesture.",
  "Take time to enjoy life and experience new things, because you'll regret it later if you don't!",
  "Learn from your mistakes and grow from them, because that's what makes us stronger people overall!",
  "Never stop dreaming and always shoot for the stars, because you can achieve anything that you put your mind to!",
  "Help others whenever you can, because it's the right thing to do and it makes you feel good too!",
  "Be positive in everything that you do, because a negative attitude will only bring down those around you as well", 
  "Embrace change and new experiences with open arms, because they're what make life interesting!",
  "Appreciate all of the amazing things that life has to offer and be grateful for every moment that you spend alive!"];
  
var currIndex = 0;
var scene = document.querySelector('a-scene');
window.setInterval(() => {
  const tweetball = document.createElement('a-sphere');
  tweetball.setAttribute("radius", `0.1`);
  tweetball.setAttribute("color", `#000000`);
  const numFs = fakeData.filter(x => x === 'f').length;
  const color = (255 * numFs / 15) + 0.1;
  tweetball.setAttribute("radius", `${color}`);
  tweetball.setAttribute("position", `0 ${fakeData[currIndex].length / 20} -3`)
  console.log("tweetball received: ");
  if (currIndex < fakeData.length) {
    currIndex++;
  }
  else {
    currIndex = 0;
  }
  scene.appendChild(tweetball);
}, 1000);

// when the client receives data from another client, update the array of client objects and the corrsp graphical representation.
socket.on("update-send", (userObj) => {
  console.log("received something on send-controller");
  // updates the pos in the array and the corresponding graphical representation
  console.log("update pos user object: ", userObj)
  playerList.updatePos(userObj);
});
