// TODO: replace filename with lowercase
/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 * @param {*} userObj
 */
export function createControllers(userObj, clientId) {
  const left = document.createElement("a-cone");
  const right = document.createElement("a-cone");
  const scene = document.querySelector("a-scene");
  scene.appendChild(left);
  scene.appendChild(right);
  // TODO: put left on front
  left.setAttribute("id", createLeftId(clientId));
  // left.setAttribute("height", `0.5`);
  // left.setAttribute("radiusBottom", `0.1`);
  // geometry="primitive: cone; radiusBottom: 1; radiusTop: 0.1"
  left.setAttribute("geometry", {
    primitive: "cone",
    height: 0.3,
    radiusBottom: 0.1,
    radiusTop: 0.01,
  });
  left.setAttribute("color", `#FFC65D`);
  // TODO: replace with right in front
  console.log("client id from right created", clientId);
  console.log("right id created: ", createRightId(clientId));
  right.setAttribute("id", createRightId(clientId));
  // TODO: replace with constants
  right.setAttribute("geometry", {
    primitive: "cone",
    height: 0.3,
    radiusBottom: 0.1,
    radiusTop: 0.01,
  });
  right.setAttribute("color", `#7BC8A4`);
  // intialization of positon
  // TODO: factor out to helper function
  left.setAttribute("position", userObj.left.pos);
  left.setAttribute("rotation", userObj.left.rot);
  right.setAttribute("position", userObj.right.pos);
  right.setAttribute("rotation", userObj.right.rot);
}

/**
 * takes in a user object and id and sets the position of that user's controllers accordingly
 * @param {*} userObj
 */
export function updateControllers(userObj, clientId) {
  try {
    const left = createLeftId(clientId);
    const right = createRightId(clientId);
    console.log("right id received:", createRightId(clientId));

    document.getElementById(left).setAttribute("position", userObj.left.pos);
    document.getElementById(left).setAttribute("rotation", userObj.left.rot);
    document.getElementById(right).setAttribute("position", userObj.right.pos);
    document.getElementById(right).setAttribute("rotation", userObj.right.rot);
  } catch (error) {
    console.error(error);
    console.log("WHY ISNT THIS WORKING");
    console.log("client id", clientId);
    // if controllers do not exist yet, then create them
    createControllers(userObj, clientId);
  }
}

/**
 * helper function for creating id of controllers from user's id
 * @param {string} userId
 * @param {string} suffix
 * @returns {string}
 */
function createIdUsingSuffix(userId, suffix) {
  const sliced = userId.slice(0, 5);
  return `a${sliced}-${suffix}`;
}

/**
 *
 * @param {string} userId
 */
function createLeftId(userId) {
  return createIdUsingSuffix(userId, "left");
}

function createRightId(userId) {
  return createIdUsingSuffix(userId, "right");
}

/**
 * takes in the current user's socket id, gets current user's pos data
 * so that script.js can send it to the server.
 * @param {string} id
 * @returns
 */
export function createMyObj(id) {
  if (id === null)
    throw "your id is null, there is no established connection to socket";
  const leftPos = document.getElementById("left-con").getAttribute("position");
  const leftRot = document.getElementById("left-con").getAttribute("rotation");
  const rightPos = document
    .getElementById("right-con")
    .getAttribute("position");
  const rightRot = document
    .getElementById("right-con")
    .getAttribute("rotation");

  const leftPosString = `${leftPos.x} ${leftPos.y} ${leftPos.z}`;
  const leftRotString = `${leftRot.x} ${leftRot.y} ${leftRot.z}`;
  const rightPosString = `${rightPos.x} ${rightPos.y} ${rightPos.z}`;
  const rightRotString = `${rightRot.x} ${rightRot.y} ${rightRot.z}`;
  const posObj = {
    left: { pos: leftPosString, rot: leftRotString },
    right: { pos: rightPosString, rot: rightRotString },
  };
  return posObj;
}