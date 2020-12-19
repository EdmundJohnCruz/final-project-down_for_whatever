import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home.js';
import SignUp from './pages/SignUp.js';
//  testing
import Inquiries from './components/Inquiries'

const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
            <Route path="/inq">
                <Inquiries />
            </Route>
        </Switch>
    );
}

export default App;