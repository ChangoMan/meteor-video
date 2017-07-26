import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import App from '../ui/App';
import Battle from '../ui/Battle';
import NotFound from '../ui/NotFound';

export const routes = (
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/battle" component={Battle}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);