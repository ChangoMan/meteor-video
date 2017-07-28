import { Meteor } from 'meteor/meteor';

// Need to import the Mongo collection on both server and client's main.js in order for it to work.
import { VideosDB } from '../imports/api/videos';

Meteor.startup(() => {
    // code to run on server at startup
});
