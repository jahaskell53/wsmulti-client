/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 * @param {*} userObj 
 */
export function createControllers(userObj) {
    //TODO: check if it is possible to create an element using js with a-frame
    // console.log("THIS IS HERE IF CONTROLLERS ARE GETTING CREATED")
    const sliced = userObj.id.slice(0, 5);
    const left = document.createElement('a-cone');
    const right = document.createElement('a-cone');
    const scene = document.querySelector('a-scene');
    scene.appendChild(left);
    scene.appendChild(right);
    left.setAttribute("id", `${sliced}-left`);
    left.setAttribute("height", `0.05`);
    left.setAttribute("radius", `0.01`);
    left.setAttribute("color", `#FFC65D`);
    right.setAttribute("id", `${sliced}-right`);
    right.setAttribute("height", `0.05`);
    right.setAttribute("radius", `0.01`);
    right.setAttribute("color", `#7BC8A4`);
    console.log("controller left id: ", left.id);
    console.log(`new controllers for player ${userObj.id} are being created here`)
}

/**
 * takes in a user object and sets the position of that user's controllers accordingly
 * @param {*} userObj 
 */
export function updateControllers(userObj) {
    const sliced = userObj.id.slice(0, 5);
    console.log("all cones", document.querySelector("a-cone"));
    console.log("controller left", document.getElementById(`${sliced}-left`));
    console.log("controller left with query selector", document.querySelector(`#${sliced}-left`));
    document.querySelector(`#${sliced}-left`).setAttribute('position', userObj.left.pos);
    document.querySelector(`#${sliced}-left`).setAttribute('rotation', userObj.left.rot);
    document.querySelector(`#${sliced}-right`).setAttribute('position', userObj.right.pos);
    document.querySelector(`#${sliced}-right`).setAttribute('rotation', userObj.right.rot);
}

/**
 * takes in the current user's socket id, gets current user's pos data
 * so that script.js can send it to the server. 
 * @param {*} id 
 * @returns 
 */
export function getMyObj(id) {
    if (id === null) throw 'there is no established connection to socket';
    const leftPos = document.getElementById("left-con").getAttribute('position');
    const leftRot = document.getElementById("left-con").getAttribute('rotation');
    const rightPos = document.getElementById("right-con").getAttribute('position');
    const rightRot = document.getElementById("right-con").getAttribute('rotation');
    
    const leftPosString = `${leftPos.x} ${leftPos.y} ${leftPos.z}`;
    const leftRotString = `${leftRot.x} ${leftRot.y} ${leftRot.z}`;
    const rightPosString = `${rightPos.x} ${rightPos.y} ${rightPos.z}`;
    const rightRotString = `${rightRot.x} ${rightRot.y} ${rightRot.z}`;
    //TODO: change id to be key instead of value
    const posObj = { id: id, left: { pos: leftPosString, rot: leftRotString }, right: { pos: rightPosString, rot: rightRotString }};
    return posObj;
}