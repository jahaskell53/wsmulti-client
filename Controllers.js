/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 * @param {*} userObj 
 */
export function createControllers(userObj) {
    //TODO: check if it is possible to create an element using js with a-frame
    console.log("THIS IS HERE IF CONTROLLERS ARE GETTING CREATED")
    const left = document.createElement('a-cone')
    const right = document.createElement('a-cone')
    left.id =  `${userObj.id}-left`
    right.id =  `${userObj.id}-right`
}

/**
 * takes in a user object and sets the position of that user's controllers accordingly
 * @param {*} userObj 
 */
export function updateControllers(userObj) {
    console.log("controller left", document.getElementById(`${userObj.id}-left`));
    document.getElementById(`${userObj.id}-left`).setAttribute('position', userObj.left.pos);
    document.getElementById(`${userObj.id}-left`).setAttribute('rotation', userObj.left.rot);
    document.getElementById(`${userObj.id}-right`).setAttribute('position', userObj.right.pos);
    document.getElementById(`${userObj.id}-right`).setAttribute('rotation', userObj.right.rot);
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