import { createControllers, updateControllers } from "./Controllers.js";

/**
 * class for the list of player objects connected to the game other than the current user. contains methods that allow to create a new player obj, to get player obj for a particular id.
 */
export default class PlayerList {
  constructor() {
    // initialize empty lsit of client objects (since at start there are no clients)
    this.clientObjArr = [];
  }

  /**
   * takes in an id and creates a new player object with their id, and default loc and rot for left and right controlers
   * @param {*} id
   */
  createNewPlayer(id) {
    console.log(`user ${id} joined`);
    const userObj = {
      id: id,
      left: { pos: `0 0 0`, rot: `0 0 0` },
      right: { pos: `0 0 0`, rot: `0 0 0` },
    };
    this.clientObjArr.push(userObj);
    console.log("new array of new user", this.clientObjArr);
    // creates controllers for a new player
    createControllers(userObj);
  }

  /**
   * takes in an id,
   * loops through array of client objects and returns the one that has the id field that matches the one passed in.
   * @param {*} id
   * @returns
   */
  getPlayerObjbyId(id) {
    for (const obj of this.clientObjArr) {
      if (obj.id == id) {
        return obj;
      }
    }
    // TODO: throw error
    return null;
  }

  /**
   * takes in an object with id, and pos data, and replaces the obj with the same id as that one in the array with this new one.
   * Also calls updateControllers in Controllers.js to update the corrsp graphical representation.
   * @param {*} receivedObj
   */
  updatePos(receivedObj) {
    // check if clientObj exists, if it does not, then we create it and the controller
    var index;
    const corrClient = this.clientObjArr.filter((clientObj, ind) => {
      if (clientObj.id === receivedObj.id) {
        index = ind;
        return true;
      }
      return false;
    });
    console.log("corr client index: ", corrClient);
    if (corrClient.length == 1) {
      console.log("before object", this.clientObjArr[index]);
      console.log("after object", receivedObj);
      this.clientObjArr[index] = receivedObj;

      // updates representation of that client's pos data graphically
      updateControllers(receivedObj);
      console.log("controllers is not being called :(");
    }
    // if there is no object, then create an object
    else {
      this.clientObjArr.push(receivedObj);
      console.log("Controllers is being called");
      createControllers(receivedObj);
    }
  }
}
