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
socket.on('send-controller', (left, right) => {
    // store left and right pos data of controller into a string (in a-frame pos format)
    const leftPos = `${left.x} ${left.y} ${left.z}`;
    const rightPos = `${right.x} ${right.y} ${right.z}`;
    // set VR object's pos to the left and right pos data strings
    document.querySelector('#left-con-server').setAttribute('position', leftPos);
    $('#right-con-server').setAttribute('position', rightPos);
    // log them
    console.log("left controller data: ", leftPos)
    console.log("right controller data: ", rightPos)
})

// every few ms, send server a message with the pos data
window.setInterval(() => {
// takes any aevent we want, and sends it to server
// get pos data of controllers and send them to server.
socket.emit('controller', document.querySelector('#left-con').getAttribute('position'), $('#right-con').getAttribute('position'))
}, 50)