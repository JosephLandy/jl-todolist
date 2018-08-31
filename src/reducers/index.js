// @flow

import * as actionConstants from '../constants/ActionTypes';
import deepcopy from 'deepcopy';

import {getID} from "../todoutils";

import * as helpers from './reducer-helpers';

import type {State} from '../types';
import type {Action} from '../actions'

// keys in an object can only be strings. I guess I should

let initialItems = [
  {id: getID(), text:"lolcat"},
  {id: getID(), text:"aardvark"},
  {id: getID(), text:"pangolin"},
];

let initialOrder = [];
let initialItemsObj = {};
for (let item of initialItems) {
  initialOrder.push(item.id);
  initialItemsObj[item.id] = item;
}

export const initialState : State = {
  selectedID: null,
  editing: false,
  itemsOrder: initialOrder,
  items: initialItemsObj,
};

// a lot of the stuff in this is mutable, because immutability is straight up a pain in the ass.

export default function rootReducer(state:State = initialState, action:Action) {
  
  switch (action.type) {

    case actionConstants.ADD_ITEM:
      return addItem(state, action);


    case actionConstants.SELECT_ITEM:
      return {...state, editing: false, selectedID: action.payload.id};

    case actionConstants.DELETE_SELECTED:

      if (state.selectedID) {
        //https://stackoverflow.com/questions/34401098/remove-a-property-in-an-object-immutably
        const {[state.selectedID]: deleted, ...remaining} = state.items;
        return {
          ...state,
          selectedID: null,
          items: remaining,
          itemsOrder: state.itemsOrder.filter((id) => id !== state.selectedID),
        };
      } else
        return state;

    case actionConstants.ENTER_EDITMODE:
      if(state.selectedID)
        return {...state, editing: true};
      else
        return state;

    case actionConstants.SUBMIT_EDIT:
      // if (state.editing) {
      return {
        ...state,
        editing: false,
        items: {
          ...state.items,
          [action.payload.id]: {
              ...state.items[action.payload.id],
            text: action.payload.text,
          },
        },
      };
    case actionConstants.TOGGLE_COMPLETE:
      return {
          ...state,
        items: {
            ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            complete: !state.items[action.payload.id].complete,
          }
        }
      };
    case actionConstants.MOVE_ITEM_BY_INDEX:
      // const newArray = deepcopy(state.itemsOrder);
      // don't need to deep copy array of strings
      // const {oldindex, newindex} = action.payload;
      // const newArray = state.itemsOrder.slice();
      // const [id] = newArray.splice(oldindex, 1);
      // newArray.splice(newindex, 0, id);
      // // I think that did it.
      return {
          ...state,
        itemsOrder: helpers.moveArrayElem(state.itemsOrder, action.payload.oldIndex, action.payload.newIndex),
      };


    default:
      return state;
  }
}



function addItem(state: State, action: Action) {
  if (state.selectedID) {
    // find index
    let i = helpers.indexOfElem(state.itemsOrder, state.selectedID);
    const newOrder = deepcopy(state.itemsOrder);
    newOrder.splice(i + 1, 0, action.payload.id);
    return {
      ...state,
      selectedID: action.payload.id,
      items: {
        ...state.items,
        [action.payload.id]: action.payload
      },
      itemsOrder: newOrder,
    };

  }

  return {...state,
    items: {...state.items, [action.payload.id]: action.payload },
    itemsOrder: [
      ...state.itemsOrder, action.payload.id
    ],
  };
}