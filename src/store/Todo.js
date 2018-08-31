import {getID} from "../todoutils";


export default class Todo {
  constructor(text) {
    this.id = getID();
    this.complete = false;
    this.text = text;
  }
}