// TODO: replace filename with lowercase
/*
 * takes in a user object and creates two controllers (left and right)
 * with id of the user's socket id + a left/right extension
 * @param {*} userObj
 */
export function createControllers(userObj, clientId) {
  // TODO: replace with entire idea
  const sliced = clientId.slice(0, 5);
  const left = document.createElement("a-cone");
  const right = document.createElement("a-cone");
  const scene = document.querySelector("a-scene");
  scene.appendChild(left);
  scene.appendChild(right);
  // TODO: put left on front
  left.setAttribute("id", `a${sliced}-left`);
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
  right.setAttribute("id", `a${sliced}-right`);
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
 * takes in a user object and sets the position of that user's controllers accordingly
 * @param {*} userObj
 */
export function updateControllers(userObj, clientId) {
  // TODO: factor out to helper function
  try {
  const sliced = clientId.slice(0, 5);
  // TODO: factor out name to var (or helper arrow function!)
  console.log("User object: ", userObj);
  document
    .querySelector(`#a${sliced}-left`)
    .setAttribute("position", userObj.left.pos);
  document
    .querySelector(`#a${sliced}-left`)
    .setAttribute("rotation", userObj.left.rot);
  document
    .querySelector(`#a${sliced}-right`)
    .setAttribute("position", userObj.right.pos);
  document
    .querySelector(`#a${sliced}-right`)
    .setAttribute("rotation", userObj.right.rot);
  }
  catch(error) {
      console.log("client id: ", clientId)
    createControllers(userObj, clientId)
    // updateControllers(userObj, clientId)
  }
}

/**
 * takes in the current user's socket id, gets current user's pos data
 * so that script.js can send it to the server.
 * @param {*} id
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
  //TODO: change id to be key instead of value
  //   const posObj = {
  //     id: id,
  //     left: { pos: leftPosString, rot: leftRotString },
  //     right: { pos: rightPosString, rot: rightRotString },
  //   };
  const posObj = {
    left: { pos: leftPosString, rot: leftRotString },
    right: { pos: rightPosString, rot: rightRotString },
  };
  return posObj;
}
