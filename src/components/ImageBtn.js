import React from 'react';
import Icon from './Icon';

class ImageBtn extends React.Component {
    /**
     * As controls receive all props for extensibility, we do a quick
     * check and make sure only the props we care about have changed.
     * @param  {object} nextProps The next props from parent
     * @return {boolean}          Whether we re-render or not
     */
    shouldComponentUpdate(nextProps) {
        return (
            this.props.paused !== nextProps.paused ||
            this.props.togglePlay !== nextProps.togglePlay
        );
    }

    render() {
        return (
            <button className="video-play video__control">
                <Icon name="pic" />
            </button>
        );
    }
}

ImageBtn.propTypes = {
    copyKeys: React.PropTypes.object,
    togglePlay: React.PropTypes.func,
    paused: React.PropTypes.bool,
};

export default ImageBtn;
