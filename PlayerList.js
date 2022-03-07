import { createControllers, updateControllers } from "./Controllers.js";
// TODO: remove players when they disconnect from socket
/**
 * class for the list of player objects connected to the game other than the current user. contains methods that allow to create a new player obj, to get player obj for a particular id.
 */
export default class PlayerList {
  constructor() {
    // initialize empty list of client objects (since at start there are no clients)
    this.clientsObj = [];
  }

  /**
   * takes in an id and creates a new player object with their id, and default loc and rot for left and right controlers
   * @param {*} id
   */
  createNewPlayer(id) {
    console.log(`user ${id} joined`);
    const userObj = {
    //   id: id,
      left: { pos: `0 0 0`, rot: `0 0 0` },
      right: { pos: `0 0 0`, rot: `0 0 0` },
    };
    // this.clientsObj.push(userObj);
    this.clientsObj[id] = userObj;
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
    // for (const obj of this.clientsObj) {
    //   if (obj.id == id) {
    //     return obj;
    //   }
    // }
    // // TODO: throw error
    // return null;
    return this.clientsObj[id];
  }

  /**
   * takes in an object with id, and pos data, and replaces the obj with the same id as that one in the array with this new one.
   * Also calls updateControllers in Controllers.js to update the corrsp graphical representation.
   * @param {*} receivedObj
   */
  updatePos(receivedObj, clientId) {
      // TODO: make this clode cleaner
      // TODO: create obj with id as key
      // TODO: replace arraylist of clients with dictionary of clients
    // check if clientObj exists, if it does not, then we create it and the controller
    // var index;
    // const corrClient = this.clientObjArr.filter((clientObj, ind) => {
    //   if (clientObj.id === receivedObj.id) {
    //     index = ind;
    //     return true;
    //   }
    //   return false;
    // });
    // create an object for that key of the id if it is not already crewated
    // TODO: do we really need to store an object of clients?
    this.clientsObj[clientId] = receivedObj;
    updateControllers(receivedObj, clientId);
    // if (this.clientsObj[clientId] !== null) {
    // //   this.clientsObj[index] = receivedObj;
    //     this.clientsObj[clientId] = receivedObj;
    //   // updates representation of that client's pos data graphically
    //   // TODO: could handle null logic in updateControllers
    //   updateControllers(receivedObj, clientId);
    // }
    // // if there is no object, then create an object
    // else {
    //   this.clientsObj[clientId] = receivedObj;
    // //   this.clientObjArr.push(receivedObj);
    // /// TODO: add id as argument
    //   createControllers(receivedObj, clientId);
    // }
  }
}
