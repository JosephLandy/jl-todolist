// @flow
import * as React from 'react';
import TodoItem from "./TodoItem";
import TodoItemEdit from './TodoItemEdit';
import {connect} from 'react-redux';
import type {ItemID, State} from "../types";


class TodoList_ extends React.Component<State> {

  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
  }

  keyHandler = (e: SyntheticKeyboardEvent<HTMLUListElement>) => {
    // console.log("keyhandler called.");
  };

  render() {
    return (
        <div>
          <ul onKeyDown={this.keyHandler}>
            { this.props.itemsOrder.map((id:ItemID, i: number) => (this.renderItem(id, i))) }
          </ul>
        </div>
    );
  }

  renderItem(id:ItemID, i: number) {
    if (this.props.editing && this.props.selectedID === id)
      return (<TodoItemEdit item={this.props.items[id]}  key={id}/>);
    else
      return (<TodoItem item={this.props.items[id]} listIndex={i} key={id} />);
  }

}

function mapStateToProps(state: State): State {
  return state;
}


// function mapDispatchToProps(dispatch) {
//   return {};
// }

const TodoList = connect(mapStateToProps)(TodoList_);
export default TodoList;