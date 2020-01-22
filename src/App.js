import React from 'react';
import 'whatwg-fetch';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
                <Route path="/github/sixth">
                    <Sixth />
                </Route>
                <Route path="/github/fifth">
                    <Fifth />
                </Route>
                <Route path="/github/fourth">
                    <Fourth />
                </Route>
                <Route path="/github/third">
                    <Third />
                </Route>
                <Route path="/github/second">
                    <Second />
                </Route>
                <Route path="/github/first">
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
