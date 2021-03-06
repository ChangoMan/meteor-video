import { Mongo } from 'meteor/mongo';
import axios from 'axios';

import SimpleSchema from 'simpl-schema';

export const VideosDB = new Mongo.Collection('videos');

export const VideosAPI = {
    getVideos: function (playlist) {
        return axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlist+'&key=AIzaSyDsgYSECSyLU3Ae2nLP_RzRIjRohHCOj0I&maxResults=50')
        .then(function (response) {

            let videoArray = response.data.items.reduce(function(acc, item) {
                acc.push(item.snippet.resourceId.videoId)
                return acc
            }, []);

            return videoArray;
        })
        .catch(function (error) {
            console.warn('Error in getVideos', error);
        });
    }
}

Meteor.methods({
    'videos.insert'(videoId) {

        new SimpleSchema({
            videoId: {
                type: String,
                min: 5
            }
        }).validate({
            videoId: videoId
        });

        VideosDB.insert({
            videoId: videoId
        });

    }
});