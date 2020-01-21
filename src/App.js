import React from 'react';
import 'whatwg-fetch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import First from './views/First/';
import Second from './views/Second/';
import Third from './views/Third/';
import Fourth from './views/Fourth/';
import Fifth from './views/Fifth/';
import Sixth from './views/Sixth/';
import Sign from './views/Sign/';
import Home from './views/Home/';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/sixth">
                    <Sixth />
                    <Sign />
                </Route>
                <Route path="/fifth">
                    <Fifth />
                    <Sign />
                </Route>
                <Route path="/fourth">
                    <Fourth />
                    <Sign />
                </Route>
                <Route path="/third">
                    <Third />
                    <Sign />
                </Route>
                <Route path="/second">
                    <Second />
                    <Sign />
                </Route>
                <Route path="/first">
                    <First />
                    <Sign />
                </Route>
                <Route path="/">
                    <Home />
                    <Sign />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
