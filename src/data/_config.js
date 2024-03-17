/*
    Each component may have their own config objects or constants. 
    This is just a master one of either shared settings across multiple components, 
    or just easier to have here so I don't have to search multiple files to turn off random features.
*/

/** @constant {Boolean}, this is just an example */
export const example = true;

/** @constant {Number}, the amount of time to type each character in microseconds */
export const typingCharacterInterval = 25; 

/** @constant {Number}, the amount of time before we do an auto save in seconds */ 
export const saveInterval = 300; 

/** @constant {Number}, the amount of time before we auto run the the next narrative, if there are no choices in microseconds */
export const nextNarrativeInterval = 2500; 