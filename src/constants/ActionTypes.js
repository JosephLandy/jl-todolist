// @flow

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const SELECT_ITEM = "SELECT_ITEM";
export const DELETE_SELECTED = "DELETE_SELECTED";
export const ENTER_EDITMODE = "ENTER_EDITMODE";

export const SUBMIT_EDIT = "SUBMIT_EDIT";
export const CANCEL_EDIT = "CANCEL_EDIT";
export const FORCE_SUBMIT = "FORCE_SUBMIT"; // used to force the current editing item to submit so that another
// item can be selected. // actually, a better way to do that would be to force a submit on an onBlur event.
// even better: set editing to false, and force a submit in onComponentWillUnmount.
// that's not really very robust, but it should work temporarily.

export const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";

export const MOVE_ITEM_BY_INDEX = "MOVE_ITEM_BY_INDEX";
