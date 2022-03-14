import { createControllers, updateControllers, removeControllers } from "./controllers.js";

/**
 * class for the list of player objects connected to the game other than the current user. 
 */
export default class PlayerList {
  constructor() {
    this.clientsObj = {};
  }

  /**
   * takes in an id and creates a new player object with their id, and default pos and rot for left and right controlers
   * @param {string} id
   */
  createNewPlayer(id) {
    console.log(`user ${id} joined`);
    const userObj = {
      left: { pos: `0 0 0`, rot: `0 0 0` },
      right: { pos: `0 0 0`, rot: `0 0 0` },
    };
    this.clientsObj[id] = userObj;
    createControllers(userObj, id);
  }

  getPlayerObjbyId(id) {
    return this.clientsObj[id];
  }

  /**
   * takes in a client id and deletes that person's object from the array,
   * and removes controller representations. 
   * @param {string} clientId
   */
  removePlayer(clientId) {
    removeControllers(clientId);
    delete this.clientsObj[clientId];
  }

  /**
   * takes in an object with id, and pos data, and replaces the obj with the same id as that one in the array with this new one.
   * Also calls updateControllers in Controllers.js to update the corrsp graphical representation.
   * @param {object} receivedObj
   */
  updatePos(receivedObj, clientId) {
    this.clientsObj[clientId] = receivedObj; // updates player obj in player list
    updateControllers(receivedObj, clientId); // updates controller representations
  }
}
