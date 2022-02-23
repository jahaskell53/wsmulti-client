// somehow knows that it is in node modules
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
// $ = (selector) => document.querySelector(selector);
//conects us to server
const socket = io('http://vrwikitest.com:3000')
// on client slide
socket.on('connect', () => {
    console.log("you connected with id: ", socket.id);
})

// when the client receives data from another client, map it to an object
socket.on('send-controller', data => {
    const position = `${data.x} ${data.y} ${data.z}`;
    document.querySelector('#user').setAttribute('position', position)
    console.log("received data: ", position)
})


window.setInterval(() => {
// takes any aevent we want, and sends it to server
// TODO: get pos data of controllers
socket.emit('controller', document.querySelector('#left-con').getAttribute('position'))
}, 50)