// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {DragSource, DropTarget} from 'react-dnd';
import * as actions from "../actions";
import * as DnDTypes from '../constants/dnd-types';

import store from '../store';


import type {TodoType, State, ItemID} from "../types";



function mapStateToProps(state:State) {
  return {selectedID: state.selectedID}
}

function mapDispatchToProps(dispatch: any => any) {
  return {
    selectItem: (newId: ItemID) => {
      dispatch(actions.selectItem(newId));
    },
    enterEditMode: () => {
      dispatch(actions.enterEditMode());
    },
    moveItemByIndex(oldIndex, newIndex) {
      dispatch(actions.moveItemByIndex(oldIndex, newIndex));
    }

  };
}


const dragSourceSpec = {
  beginDrag(props) {
    console.log("start drag");
    return {
      listIndex: props.listIndex,
    };
  },
};


const dropTargetSpec = {
  drop(props) {
    console.log("dropped on item with index: " + props.listIndex);
  },

  hover: function (props:Props, monitor, component) {
    // console.log("hover called");
    if (!component) {
      return;
    }

    const dragIndex = monitor.getItem().listIndex; // monitor contains info about dragged item.
    const hoverIndex = props.listIndex; // contains info about drop target.

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const node = ReactDOM.findDOMNode(component);
    let targetRect;
    // determine type of node. should be element.
    if (node instanceof Text) {
      // console.log("hovered over dom node is instance of text.");
      return;
    } else if (node === null) {
      // console.log("hovered over null");
      return;
    } else if (node instanceof Element) {
      // console.log("hovered over element");
      targetRect = node.getBoundingClientRect();
    } else {
      return;
    }

    const targetYCenter = (targetRect.bottom - targetRect.top) / 2;
    // dragOffset

    type XYCoord = {x: number, y: number}

    // dragged item position.
    const dragOffset: XYCoord = monitor.getClientOffset();

    // distance to the top of the target component.
    const toTargetRoof:number = dragOffset.y - targetRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && toTargetRoof < targetYCenter) {
      return;
    }
    // Dragging upwards
    if (dragIndex > hoverIndex && toTargetRoof > targetYCenter) {
      return;
    }

    // now submit action to move item to new hovered over position.
    // store.dispatch(actions.moveItemByIndex(dragIndex, hoverIndex));

    props.moveItemByIndex(dragIndex, hoverIndex);


    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().listIndex = hoverIndex; // ok this bit is really important.
    // without updating the list index for the item, it thrashes or something.
    // it would probably avoid this if I made the items index part of the redux state,
    // rather than passing it into the item.

  }

};

// The monitors let you update the props of your components in response to the drag and drop state changes.

// this just passes information about the drag and drop back to the component. I don't need to do that now though.
function dragCollect(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
  };

}

function dropCollect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
  }
}

type Props = {
  item:TodoType,
  listIndex: number, // must know it's own position in the list, for drag and drop.
  selectedID:ItemID,
  selectItem:(id:ItemID) => any,
  enterEditMode: () => any,
  moveItemByIndex: (number, number) => any,
  connectDragSource: any,
  connectDropTarget: any,
  isOver: boolean,
};

class TodoItem_ extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }


  clickHandler = (e: SyntheticEvent<HTMLLIElement>) => {

    if (this.props.selectedID !== this.props.item.id) {
      this.props.selectItem(this.props.item.id);
    } else {
      // click selected item to enter edit mode.
      this.props.enterEditMode();
    }
    // e.preventDefault();
  };

  render() {
    let classname = "todo-item";
    if (this.props.selectedID === this.props.item.id)
      classname += ' selected';

    if (this.props.isOver)
      classname += " drop-target";

    return this.props.connectDragSource(this.props.connectDropTarget(
      <li onClick={this.clickHandler} className={classname}>
        <div>
          <input type="checkbox" value={this.props.item.complete}/>
          {this.props.item.text}
        </div>

      </li>
    ));
  }

}

const DropTodoItem = DropTarget(DnDTypes.TODO_DND, dropTargetSpec, dropCollect)(TodoItem_);
const DragTodoItem = DragSource(DnDTypes.TODO_DND, dragSourceSpec, dragCollect)(DropTodoItem);

export default connect(mapStateToProps, mapDispatchToProps)(DragTodoItem);

// export default connect(mapStateToProps, mapDispatchToProps)(
//     DragSource(DnDTypes.TODO_DND, dragSourceSpec, dragCollect)(
//         DropTarget(DnDTypes.TODO_DND, dropTargetSpec, dropCollect)(TodoItem_)
//     )
// );