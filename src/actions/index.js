// @flow

import type {TodoType, ItemID} from '../types';
import * as actionConstants from '../constants/ActionTypes'

// export type AddItemAction = {
//   type: "ADD_ITEM",
//   payload: TodoType,
// }

// export type SelectAction = {
//   type: "SELECT_ITEM",
//   payload: {
//     id: ItemID,
//   },
// }
//
// export type DeleteAction = {
//   type: "DELETE_ITEM",
//   payload: {
//     id: ItemID,
//   },
// }
//
// export type DeleteSelectedAction = {
//   type: "DELETE_SELECTED",
// }
//
// export type EnterEditmodeAction = {
//   type: "ENTER_EDITMODE",
// }
//
// export type SubmitEditAction = {
//   type: string,
//   payload: {
//     text: string,
//   },
// }


// export type Action =
//   | AddItemAction
//   | SelectAction
//   | DeleteAction
//   | DeleteSelectedAction
//   | EnterEditmodeAction
//   | SubmitEditAction;

export type Action = any;


export function addItem(item:TodoType) {
  return {
    type: actionConstants.ADD_ITEM,
    payload: item,
  }
}

// delete the item with the id value listed.


export function selectItem(id: ItemID) {
  return {
    type: actionConstants.SELECT_ITEM,
    payload: {
      id,
    },
  };
}


export function deleteItem(id:ItemID) {
  return {
    type: actionConstants.DELETE_ITEM,
    payload: {
      id,
    },
  };

}

// no payload, no parameters. Still shouldn't allow this to be repeated in the handler if nothing is selected.
export function deleteSelected() {
  return {
    type: actionConstants.DELETE_SELECTED,
  }
}


export function enterEditMode() {
  return {
    type: actionConstants.ENTER_EDITMODE,
  };
}

export function submitEdit(id:ItemID, text:string) {
  return {
    type: actionConstants.SUBMIT_EDIT,
    payload: {
      id,
      text,
    }
  }
}

export function toggleComplete(id: ItemID) {
  return {
    type: actionConstants.TOGGLE_COMPLETE,
    payload: {
      id,
    }
  };
}

export function moveItemByIndex(oldIndex:number, newIndex: number) {
  return {
    type: actionConstants.MOVE_ITEM_BY_INDEX,
    payload: {
      oldIndex,
      newIndex,
    }
  }

}

