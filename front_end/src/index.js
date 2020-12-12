import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import App from './App.js';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

const loadState = () => {
  try {
    const targetState = localStorage.getItem('state');
    if(targetState === null){
      return undefined;
    }
    return JSON.parse(targetState);
  }
  catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const targetState = JSON.stringify(state);
    localStorage.setItem('state',targetState);
  }
  catch (err){
    return console.log('there was an error with saveState');
  }
};

const loginState = loadState();

const store = createStore(rootReducer, loginState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('store.getState(): ', store.getState());
  console.log('store.getState()userReducer: ', store.getState().userReducer);

  saveState({
    userReducer: store.getState().userReducer
  });
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
