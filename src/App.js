import React from 'react';
import 'whatwg-fetch';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import First from './views/First/';
import Second from './views/Second/';
import Third from './views/Third/';
import Fourth from './views/Fourth/';
import Fifth from './views/Fifth/';
import Sixth from './views/Sixth/';
import Home from './views/Home/';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/sixth">
                    <Sixth />
                </Route>
                <Route path="/fifth">
                    <Fifth />
                </Route>
                <Route path="/fourth">
                    <Fourth />
                </Route>
                <Route path="/third">
                    <Third />
                </Route>
                <Route path="/second">
                    <Second />
                </Route>
                <Route path="/first">
                    <First />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
