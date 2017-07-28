import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
// import { Tracker } from 'meteor/tracker';

import { routes } from '../imports/routes/routes';

// Need to import the Mongo collection on both server and client's main.js in order for it to work.
import { VideosDB } from '../imports/api/videos';

Meteor.startup(() => {
    ReactDOM.render(routes, document.getElementById('app'));
});