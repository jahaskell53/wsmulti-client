// get io from CDN
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
// $ = (selector) => document.querySelector(selector); // why is there no var declr?
//conects us to server. must be www bc i think we set up certificate with www
const socket = io('https://www.vrwikitest.com:3000')
// on client slide, show your id when you connect to a server
socket.on('connect', () => {
    console.log("you connected with id: ", socket.id);
})

// when the client receives data from another client, map it to an object
socket.on('send-controller', (leftPosObj, leftRotObj, rightPosObj, rightRotObj) => {
    const serverLeft = document.querySelector('#left-con-server');
    const serverRight = document.querySelector('#right-con-server');
    // store left and right pos data of controller into a string (in a-frame pos format)
    const leftPos = `${leftPosObj.x} ${leftPosObj.y} ${leftPosObj.z}`;
    const leftRot = `${leftRotObj.x} ${leftRotObj.y} ${leftRotObj.z}`;
    const rightPos = `${rightPosObj.x} ${rightPosObj.y} ${rightPosObj.z}`;
    const rightRot = `${rightRotObj.x} ${rightRotObj.y} ${rightRotObj.z}`;
    // set VR object's pos to the left and right pos data strings
    serverLeft.setAttribute('position', leftPosObj);
    serverLeft.setAttribute('rotation', leftRotObj);
    serverRight.setAttribute('position', rightPosObj);
    serverRight.setAttribute('rotation', rightRotObj);
    // log them
    console.log("left controller data: ", leftPosObj)
    console.log("right controller data: ", rightPosObj)
})

// every few ms, send server a message with the pos data
window.setInterval(() => {
// takes any aevent we want, and sends it to server
// get pos data of controllers and send them to server.
const left = document.querySelector('#left-con');
const right = document.querySelector('#right-con');

socket.emit('controller', left.getAttribute('position'), left.getAttribute('rotation'), right.getAttribute('position'),  right.getAttribute('rotation'))
}, 50)
