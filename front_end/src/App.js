import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import SignUp from './pages/SignUp.js';
//  testing
import ListingCreationForm from './components/ListingCreationForm'

const App = () => {
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
    };

    return (
        <Switch>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/lcf">
                <ListingCreationForm />
            </Route>
        </Switch>
    );
}

export default App;