import React from 'react';
import Time from './Time';
import Play from './Play';
import Seek from './Seek';

const Controls = function(props) {
    const children = [<Play />, <Seek />, <Time />];
    return (
        <div className="video-controls video__controls">
            {children.map((child, i) => {
                return React.cloneElement(child, { ...props, key: i });
            })}
        </div>
    );
};

export default Controls;
