import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import SignUp from './pages/SignUp.js';
//  testing
import ListingCreationForm from './components/ListingCreationForm'

const App = () => {
    return (
        <Switch>
            <Route path="/">
                <Home />
            </Route>
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