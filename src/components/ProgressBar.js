import React from 'react';

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
    orientation: React.PropTypes.string,
    step: React.PropTypes.number,
    progress: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
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
