import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Modal from 'react-modal';

import VideoAPI from './../api/videos';

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: '',
            modalIsOpen: true
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        let videoId = this.refs.videoId.value.trim();
        this.setState({
            selectedVideo: videoId,
            modalIsOpen: false
        });
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

                <div className="video-wrapper">
                    <YouTube
                        videoId={this.state.selectedVideo}
                        opts={opts}
                        className="video-iframe"
                        onEnd={this.nextVideo}
                        onError={this._onError}
                    />
                </div>
            </div>
        )
    }
}

export default Battle;