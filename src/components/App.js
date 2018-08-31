// @flow
import * as React from 'react';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import logo from '../images/logo.svg';
import '../App.css';
import TodoList from './TodoList';
import CreateItemForm from './CreateTodoItemForm';

import {Provider} from 'react-redux';

import store from '../store';

import {deleteSelected, addItem} from "../actions";


import type {State, TodoType} from "../types";

export default class App extends React.Component<{}> {
  render() {
    return (
        <Provider store={store}>
          <AppFunctionality />
        </Provider>
    );
  }
}

// I don't think I need to connect this with the store yet. I can have the logic in the list.

type Props = {editing:boolean, deleteSelected: () => void};


class AppFunctionality_ extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
  }

  componentDidMount() {
    // listening on the document prevents input on the to do creation form.
    document.addEventListener('keydown', this.keyHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyHandler);
  }

  // The keyboard events aren't actually interacting with react's shadow dom.
  // they fire, and then update the store. There isn't really any reason that they need to be bound
  // to a component. Then I can reference the function from another component, in order to remove it from the
  // document.
  // this probably isn't the ideal solution, but I'm going to use it for the time being and I can migrate later
  // if I find something else. It works.
  keyHandler = (e:KeyboardEvent) => {
    if (!this.props.editing) {
      switch (e.key) {
        case "Backspace":
          // console.log("backspace pressed");
          this.props.deleteSelected();
          break;
        case "N":
          break;

        default:
          break;
      }
    }
    // e.preventDefault();
  };

  reactKeyHandler = (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    console.log("app keyhandler called.");
  };

  render() {
    return(
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo list with react+redux, written with flow-type.</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <TodoList />

        <CreateItemForm/>

        <div>
          <h3>
            keyboard shortcuts
          </h3>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state:State) {
  return {
    editing: state.editing,
  }
}


function mapDispatchToProps(dispatch:any) {
  return {
    deleteSelected: () => {
      dispatch(deleteSelected());
    },
    addItem: (item: TodoType) => {
      dispatch(addItem(item));
    }
  }
}

const AppFunctionality = connect(mapStateToProps, mapDispatchToProps)(
    DragDropContext(HTML5Backend)(AppFunctionality_)
);