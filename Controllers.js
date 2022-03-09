// TODO: replace filename with lowercase
/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 * @param {*} userObj
 */
export function createControllers(userObj, clientId) {
  const CONE_HEIGHT = 0.3;
  const CONE_RADIUS_BOTTOM = 0.1;
  const CONE_RADIUS_TOP = 0.01;
  const CONE_LEFT_COLOR = `#FFC65D`;
  const CONE_RIGHT_COLOR = `#7BC8A4`;

  const left = document.createElement("a-cone");
  const right = document.createElement("a-cone");
  const scene = document.querySelector("a-scene");

  scene.appendChild(left);
  scene.appendChild(right);

  function setControllerProps(controller) {
    controller.setAttribute("geometry", {
        primitive: "cone",
        height: CONE_HEIGHT,
        radiusBottom: CONE_RADIUS_BOTTOM,
        radiusTop: CONE_RADIUS_TOP,
      });
  }
  
  setControllerProps(left);
  setControllerProps(right);

  left.setAttribute("id", createLeftId(clientId));
  left.setAttribute("color", CONE_LEFT_COLOR);

  right.setAttribute("id", createRightId(clientId));
  right.setAttribute("color", CONE_RIGHT_COLOR);

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

    document.getElementById(left).setAttribute("position", userObj.left.pos);
    document.getElementById(left).setAttribute("rotation", userObj.left.rot);
    document.getElementById(right).setAttribute("position", userObj.right.pos);
    document.getElementById(right).setAttribute("rotation", userObj.right.rot);
  } catch (error) {
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

function removeControllers(userId) {
    document.getElementById(createLeftId(userId)).remove();
    document.getElementById(createRightId(userId)).remove();
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
