// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import '../App.css'
import {submitEdit} from "../actions";

import type {TodoType, ItemID} from "../types";


// function mapStateToProps(state:State) {
//
// }
//
function mapDispatchToProps(dispatch:any) {
  return {submitEdit: (id:ItemID, text: string) => {
      dispatch(submitEdit(id, text));
    }};
}


// better way to handle this stuff might be to have the todolist check state, and then construct different
// kinds of TodoItem components with different capabilities/registered event handlers.

type Props = {
  item:TodoType,
  submitEdit: (ItemID, string) => any,
};

type LocalState = {
  text: string
};

class TodoItemEdit extends React.Component<Props, LocalState> {

  constructor(props: Props) {
    super(props);

    this.state = {
      text: this.props.item.text,
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler = (e: SyntheticEvent<HTMLInputElement>) => {

    this.setState({text: e.currentTarget.value});

  };

  submitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    console.log("submitting");
    this.props.submitEdit(this.props.item.id, this.state.text);


    event.preventDefault();
  };

  render() {

    return (
        <li className="todo-item-editmode">
          <form onSubmit={this.submitHandler}>
            <input autoFocus type='text' value={this.state.text} onChange={this.changeHandler}/>
          </form>
        </li>
    );
  }

  componentWillUnmount() {
    // force an update when editing ends (when another item is selected).
    // submitEdit(this.state.text);
    // no that won't work, because id is not the selected ID.
    // a better approach is to simplify the reducer to use a passed ID, rather
    // than the selected ID.
    this.props.submitEdit(this.props.item.id, this.state.text);

  }


}



export default connect(null, mapDispatchToProps)(TodoItemEdit);
// export default TodoItem;