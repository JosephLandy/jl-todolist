// @flow

import type {ItemID} from "./types";
import uuidv4 from 'uuid/v4';

// // just make sure not to call this in the reducer.
// let currentID = 0;
//
// export function getID():ItemID {
//   currentID++;
//   return currentID;
// }

export function getID():ItemID {
  return uuidv4();
}