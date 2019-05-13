import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const VIDEO_EVENTS = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
];

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            networkState: 0,
            paused: !props.autoPlay,
            muted: !!props.muted,
            volume: 1,
            error: false,
            loading: false,
        };

        this.videoProps = Object.assign(
            {},
            ...Object.keys(props)
                .filter(
                    p =>
                        ![
                            'store',
                            'crops',
                            'dispatch',
                            'children',
                            'onTimeUpdate',
                        ].includes(p)
                )
                .map(k => ({ [k]: props[k] }))
        );

        this.videoEl = React.createRef();
    }

    componentWillMount() {
        this.mediaEventProps = VIDEO_EVENTS.reduce((mediaProps, eventName) => {
            mediaProps[eventName] = event => {
                if (
                    eventName in this.props &&
                    typeof this.props[eventName] === 'function'
                ) {
                    this.props[eventName](event);
                }
                this.updateStateFromVideo();
                this.props.dispatch({
                    type: 'VIDEO',
                    name: event.type,
                });
            };
            return mediaProps;
        }, {});
    }

    togglePlay = () => {
        if (this.state.paused) {
            this.videoEl.current.play();
        } else {
            this.videoEl.current.pause();
        }
    };

    toggleMute() {
        this.videoEl.current.muted = !this.state.muted;
    }

    load() {
        this.videoEl.current.load();
    }

    seek = time => {
        this.videoEl.current.currentTime = time;
    };

    setVolume(volume) {
        this.videoEl.current.volume = volume;
    }

    updateStateFromVideo() {
        if (
            (this.videoEl.current.currentTime / this.videoEl.current.duration) *
                100 >
            this.props.crop_end
        ) {
            this.videoEl.current.currentTime =
                (this.props.crop_start / 100) * this.videoEl.current.duration;
        }
        this.setState({
            // Standard video properties
            duration: this.videoEl.current.duration,
            currentTime: this.videoEl.current.currentTime,
            buffered: this.videoEl.current.buffered,
            paused: this.videoEl.current.paused,
            muted: this.videoEl.current.muted,
            volume: this.videoEl.current.volume,
            readyState: this.videoEl.current.readyState,

            // Non-standard state computed from properties
            percentageBuffered:
                this.videoEl.current.buffered &&
                this.videoEl.current.buffered.length &&
                (this.videoEl.current.buffered.end(
                    this.videoEl.current.buffered.length - 1
                ) /
                    this.videoEl.current.duration) *
                    100,
            percentagePlayed: this.videoEl.current.currentTime
                ? (this.videoEl.current.currentTime /
                      this.videoEl.current.duration) *
                  100
                : 0,
            error:
                this.videoEl.current.networkState ===
                this.videoEl.current.NETWORK_NO_SOURCE,
            loading:
                this.videoEl.current.readyState <
                this.videoEl.current.HAVE_ENOUGH_DATA,
        });
    }

    renderControls() {
        const extendedProps = Object.assign(
            {
                // The public methods that all controls should be able to use.
                togglePlay: this.togglePlay,
                toggleMute: this.toggleMute,
                play: this.play,
                pause: this.pause,
                seek: this.seek,
                fullscreen: this.fullscreen,
                setVolume: this.setVolume,
            },
            this.state,
            this.props
        );

        return React.Children.map(this.props.children, (child, i) => {
            if (child.type === 'source') {
                return;
            }
            return React.cloneElement(child, extendedProps);
        });
    }

    renderSources() {
        return React.Children.map(this.props.children, (child, i) => {
            if (child.type !== 'source') {
                return;
            }
            return child;
        });
    }

    getVideoClassName() {
        let classString = 'video';

        if (this.state.error) {
            classString += ' video--error';
        } else if (this.state.loading) {
            classString += ' video--loading';
        } else if (this.state.paused) {
            classString += ' video--paused';
        } else {
            classString += ' video--playing';
        }

        if (this.state.focused) {
            classString += ' video--focused';
        }
        return classString;
    }

    onFocus = () => {
        this.setState({
            focused: true,
        });
    };

    render() {
        console.log('Rendering video');
        return (
            <div
                className={this.getVideoClassName()}
                tabIndex="0"
                onFocus={this.onFocus}>
                <video
                    preload={'metadata'}
                    className={'video__el'}
                    {...this.videoProps}
                    {...this.mediaEventProps}
                    ref={this.videoEl}>
                    {this.renderSources()}
                </video>
                {this.renderControls()}
            </div>
        );
    }
}

Video.propTypes = {
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    controls: PropTypes.bool,
    onTimeUpdate: PropTypes.func,
};

Video.defaultProps = {
    onTimeUpdate: e => {
        // console.log(e);
        // console.log(this.videoEl);
    },
};

export default Video;

function mapStateToProps(state) {
    return {
        crop_start: state.crop_start,
        crop_end: state.crop_end,
    };
}
export const RdxVideo = connect(mapStateToProps)(Video);
