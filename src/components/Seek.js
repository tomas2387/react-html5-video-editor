import React from 'react';
import ProgressBar from './ProgressBar';
import CropMarker from './CropMarker';
import { cropChanged } from '../actions/actionCreators';
import PropTypes from 'prop-types';

class Seek extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focused: false,
        };
    }

    seek = e => {
        this.props.seek((e.target.value * this.props.duration) / 100);
    };

    onFocus = () => {
        this.setState({
            focused: true,
        });
    };

    cropsChanged = (where, position) => {
        this.props.store.dispatch(cropChanged(where, position));
    };

    render() {
        return (
            <div
                className={
                    'video-seek video__control' +
                    (this.state.focused ? ' video__control--focused' : '')
                }>
                <div className="video-seek__container">
                    <div
                        style={{
                            width: this.props.percentageBuffered + '%',
                        }}
                        className="video-seek__buffer-bar"
                    />
                    <ProgressBar
                        onFocus={this.onFocus}
                        onChange={this.seek}
                        progress={this.props.percentagePlayed}
                    />
                    {this.props.crops.map((e, index) => {
                        let isStart = index === 0;
                        return (
                            <CropMarker
                                position={e}
                                key={index}
                                isStart={isStart}
                                cropsChanged={this.cropsChanged}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

Seek.propTypes = {
    seek: PropTypes.func,
    percentageBuffered: PropTypes.number,
    percentagePlayed: PropTypes.number,
    duration: PropTypes.number,
};

export default Seek;
