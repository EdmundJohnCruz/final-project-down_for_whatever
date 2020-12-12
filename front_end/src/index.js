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
import {setListings} from './redux/actions/listingActions';

import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

// ws update helpers
const getListings = (dispatch) => { // also called in Listings.js
  axios.get('/api/listingserver/listings')
  .then( (res) => {
    console.log('updating listings: ', res.data);
      dispatch(setListings(res.data.listings));
  })
  .catch( (err) => {
    console.log('update listings failed in index.js');
    console.log(err);
  })
};

// set ws actions for different messages
const ws = new WebSocket('ws://' + window.location.host.split(':')[0] + (window.location.port && `:${window.location.port}`) + '/websocket');
ws.onopen = (ev) => {
  console.log('opened ws');
};
ws.onclose = (ev) => {
  console.log('closed ws');
};
ws.onerror = (ev) => {
  console.log('ws error: ', ev);
};
ws.onmessage = (ev) => {
  console.log('ws message: ', ev);
  const data = JSON.parse(ev.data);
  if(data.message === 'listingChange'){
    console.log('updating listings...');
    getListings(store.dispatch);
  }
};


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
