// @flow

export type TodoType = {
  id: ItemID,
  text:string,
  complete: boolean,
};

export type State = {
  +selectedID: ?ItemID,
  +editing: boolean,
  +itemsOrder: ItemID[],
  +items:{[ItemID]:TodoType},
};

// use ItemID as the type, so I can change the actual type of the ID later.
export type ItemID = string;