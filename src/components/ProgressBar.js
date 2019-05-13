import React from 'react';
import PropTypes from 'prop-types';

class ProgressBar extends React.Component {
    onChange = e => {
        this.props.onChange(e);
    };

    render() {
        return (
            <div
                id={'video-progress-bar'}
                className={
                    'video-progress-bar ' +
                    (this.props.orientation === 'horizontal'
                        ? 'video-progress-bar--horizontal'
                        : 'video-progress-bar--vertical')
                }>
                <div
                    className="video-progress-bar__fill"
                    style={{
                        ['width']: this.props.progress + '%', //transition: width 1s ease-in-out;
                    }}
                />
                <input
                    className="video-progress-bar__input"
                    onBlur={this.props.onBlur}
                    onFocus={this.props.onFocus}
                    ref="input"
                    onChange={this.onChange}
                    type="range"
                    min="0"
                    max="100"
                    value={this.props.progress}
                    step={this.props.step}
                />
            </div>
        );
    }
}

ProgressBar.propTypes = {
    orientation: PropTypes.string,
    step: PropTypes.number,
    progress: PropTypes.number,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

ProgressBar.defaultProps = {
    orientation: 'horizontal',
    step: 0.1,
    progress: 0,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
};

export default ProgressBar;
