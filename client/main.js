import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Tracker } from 'meteor/tracker';

import { routes } from '../imports/routes/routes';

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});