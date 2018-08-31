import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import * as actionCreators from "./actions";


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


window.store = store;
// window.addItem = addItem;
window.actionCreators = actionCreators;