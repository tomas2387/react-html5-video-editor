import React from 'react';

function Icon(props) {
    return <span className={'video-icon video-icon--' + props.name} />;
}

Icon.propTypes = {
    name: React.PropTypes.oneOf([
        'play-1',
        'volume-off',
        'volume-down',
        'volume-up',
        'resize-full',
        'resize-small',
        'pause-1',
        'crop',
        'crop-begin',
        'crop-end',
        'pic',
    ]),
};

export default Icon;
