import rootReducer from "./index";
import * as actions from '../actions';
import {getID} from "../todoutils";

import deepcopy from 'deepcopy';

// lets use a single fake state as the test data rather than messing around with ids.
const testState = {
  selectedID: null,
  editing: false,
  itemsOrder: [
    'id1',
    'id2',
    'id3',
  ],
  items: {
    id1: {
      id:'id1',
      text: 'item 1',
    },
    id2: {
      id: 'id2',
      text: 'item 2',
    },
    id3: {
      id:'id3',
      text: 'item 3',
    },
  }
}

describe('deep copy', () => {
  test('deep copies', () => {
    expect(deepcopy(testState)).toEqual(testState);
  });
})

describe('root reducer', () => {
  // compare state passed into function to this to confirm immutability.
  const OGState = deepcopy(testState);


  describe('add item action', () => {
    const item = {id:'newID', text: "test add action"};

    const action = actions.addItem(item);

    let expected = deepcopy(testState);
    expected.items[item.id] = item;
    expected.itemsOrder.push(item.id);

    test('adds item', () => {
      expect(rootReducer(testState, action)).toEqual(expected);
    });
    // it('should not mutate state', () => {
    //
    // });
  });

  describe('select item action', () => {

    test('selects item', () => {
      let expected = deepcopy(testState);
      expected.selectedID = testState.items.id2.id;
      const action = actions.selectItem('id2');
      expect(rootReducer(testState, action)).toEqual(expected);

    });
  });

  describe('enter edit mode action', function () {

    const action = actions.enterEditMode();
    it('should set editing true', () => {
      let thisState = deepcopy(testState);
      thisState.selectedID = 'id1';
      let expected = deepcopy(thisState);
      expected.editing = true;
      expect(rootReducer(testState, action)).toEqual(expected);
    });

    it('should leave state unchanged with no selection', () => {
      expect(rootReducer(testState, action)).toEqual(testState);
    });

  });
  
  describe('submit edit action', () => {
    it('should set editing = false.', function () {


    });
    it('should only submit edit if selected = true', () => {

    });


  });

  // describe('delete item action', () => {
  //
  // });


  describe('delete selected item action', () => {
    test('returns state if no selectedID', () => {
      expect(rootReducer(testState, actions.deleteSelected())).toEqual(testState);
    });

    test('deletes selected item', () => {
      let testdata = deepcopy(testState);
      testdata.selectedID = 'id2';

      const expected = {
        selectedID: null,
        editing: false,
        itemsOrder: [
          'id1',
          'id3',
        ],
        items: {
          id1: {
            id:'id1',
            text: 'item 1',
          },
          id3: {
            id:'id3',
            text: 'item 3',
          },
        },
      };

      expect(rootReducer(testdata, actions.deleteSelected())).toEqual(expected);

    });
  });

});

// describe('delete reducer', () => {
//   it('should return the state without specified item', () => {
//     test('removes initial ')
//
//   });
// });