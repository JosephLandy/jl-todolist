// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import type {TodoType} from "../types";
import {addItem} from "../actions";
import {getID} from "../todoutils";


function mapDispatchToProps(dispatch:any) {
  return {addTodo: item => dispatch(addItem(item))};
}

type Props = {
  addTodo: (item:TodoType) => any,
}


class Form extends React.Component<Props, {text:string}> {

  constructor() { // no props.
    super();
    this.state = {
      text: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>) => {

    this.setState({text: e.currentTarget.value});

  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {

    this.props.addTodo({id:getID(), text: this.state.text, complete: false});

    event.preventDefault();
    this.setState({text: ""});

  };


  // I should actually just have a list item inserted, and then render one element of the list of items as a form,
  // rather than a to do item. Or rather, render the currently editing item as a form.
  render() {
    return(
      <form onSubmit={this.handleSubmit} >
        <label htmlFor="text">text: </label>

        <input type="text" id="text" value={this.state.text} onChange={this.handleChange}/>

        <button type="submit">
          Create
        </button>

      </form>
    )

  }
}


const CreateItemForm = connect(null, mapDispatchToProps)(Form);

export default CreateItemForm;