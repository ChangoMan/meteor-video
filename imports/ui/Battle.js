import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Modal from 'react-modal';

import {VideosDB} from './../api/videos';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: '',
            selectedVideoTitle: '',
            modalIsOpen: true,
            error: ''
        }
    }
    componentDidMount() {
        this.videosTracker = Tracker.autorun(() => {
            Meteor.subscribe('videos');
            const videos = VideosDB.find({}).fetch();

            if (videos.length > 0) {
                this.setState({
                    selectedVideo: videos[Math.floor(Math.random()*videos.length)].videoId
                })
            }
            // this.setState({
            //     selectedVideo: video
            // });

        });
    }
    componentWillUnmount() {
        this.videosTracker.stop();
    }
    onSubmit = (e) => {
        e.preventDefault();
        let videoId = this.refs.videoId.value.trim();

        Meteor.call('videos.insert', videoId, (err, res) => {
            if (!err) {

                this.setState({
                    selectedVideo: videoId,
                    modalIsOpen: false
                });

                this.getVideoInfo();

            } else {
                this.setState({ error: err.reason });
            }
        });

    }
    getVideoInfo = (event) => {
        if (event) {
            this.setState({
                selectedVideoTitle: event.target.getVideoData().title
            });
        }
    }
    toggleModal = () => {
        this.setState(function(prev) {
            return {
                modalIsOpen: !this.state.modalIsOpen
            }
        });
    }
    nextVideo = () => {
        console.log('END, coming soon')
    }
    _onError = (event) => {
        console.log(event.target.getVideoData());
    }
    render() {

        const opts = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0
            }
        };

        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Add Video"
                    className={{
                        base: 'react-modal',
                        afterOpen: 'react-modal--after'
                    }}
                    overlayClassName="react-modal-overlay"
                    onRequestClose={this.toggleModal}
                >
                    <form className="form-inline" onSubmit={this.onSubmit}>
                        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" ref="videoId" placeholder="YouTube ID" />
                        <button type="submit" className="btn">Add</button>
                    </form>
                </Modal>

                <div className="controls-btn">
                    <button className="btn" onClick={this.toggleModal}>Add Video</button>
                </div>

                <div className="video-list z-float">
                    <p>Now Playing: {this.state.selectedVideoTitle}</p>
                    <p></p>
                </div>

                <div className="video-wrapper">
                    <YouTube
                        videoId={this.state.selectedVideo}
                        opts={opts}
                        className="video-iframe"
                        onPlay={this.getVideoInfo}
                        onEnd={this.nextVideo}
                        onError={this._onError}
                    />
                </div>
            </div>
        )
    }
}

export default Battle;