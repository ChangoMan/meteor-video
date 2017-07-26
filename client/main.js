import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';

import App from './../imports/ui/App';
import VideoAPI from './../imports/api/videos';

Meteor.startup(() => {
    ReactDOM.render(<App />, document.getElementById('app'));
});