import React from 'react';
import ProgressBar from './ProgressBar';
import CropMarker from './CropMarker';

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
                    {this.props.crops.map(function(e, index) {
                        return <CropMarker position={e} key={index} />;
                    })}
                </div>
            </div>
        );
    }
}

Seek.propTypes = {
    seek: React.PropTypes.func,
    percentageBuffered: React.PropTypes.number,
    percentagePlayed: React.PropTypes.number,
    duration: React.PropTypes.number,
};

export default Seek;
