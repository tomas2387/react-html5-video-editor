import React from 'react';
import ReactDOM from 'react-dom';
import { RdxVideo } from './components/Video';
import Controls from './components/Controls';
import Overlay from './components/Overlay';
import store from './store';

function render_editor(
    poster = 'src/img/poster.png',
    vid_path = 'src/video/small.mp4'
) {
    ReactDOM.render(
        <RdxVideo loop muted poster={poster} store={store}>
            <Overlay />
            <Controls />
            <source src={vid_path} type="video/mp4" />
        </RdxVideo>,
        document.getElementById('root')
    );
}

export { RdxVideo, Overlay, Controls, store, render_editor };
