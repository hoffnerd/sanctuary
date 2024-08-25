/**
 * @typedef {Object} SaveData
 * @property {Array<object>} inventory - object, unique id of the content
 * 
 */

/**
 * @typedef {Object} SaveFile
 * @property {String} id - string, unique id of the content
 * @property {String} userId - string, unique id of the user
 * @property {String} name - string, name of the player character
 * @property {"Story" | "Unlimited"} type - string, type of game the user is playing.
 * @property {SaveData} saveData - object
 * @property {Number} inGameTime - int, number seconds on the save file
 * @property {Date} createdAt - date time, when the save file was created
 * @property {Date} updatedAt - date time, when the data was last saved
 */




export {};
