import React from 'react';
import interact from 'interact.js';

class CropMarker extends React.Component {
    componentDidMount() {
        function dragMoveListener(event) {
            var target = event.target;
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        window.dragMoveListener = dragMoveListener;
        if (this.props.isStart) {
            interact('.draggable_start').draggable({
                inertia: true,
                restrict: {
                    restriction: 'parent',
                    endOnly: false,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                },
                autoScroll: true,
                onmove: dragMoveListener,
                onend: event => {
                    var target = event.target;
                    const x = parseFloat(target.getAttribute('data-x'));
                    const start = (x / 400) * 100;
                    this.props.cropsChanged('start', start);
                },
            });
        } else {
            interact('.draggable_end').draggable({
                inertia: true,
                restrict: {
                    restriction: 'parent',
                    endOnly: false,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                },
                autoScroll: true,
                onmove: dragMoveListener,
                onend: event => {
                    var target = event.target;
                    const x = parseFloat(target.getAttribute('data-x'));
                    const end = ((400 + x) / 400) * 100;
                    this.props.cropsChanged('end', end);
                },
            });
        }
    }

    render() {
        let className = 'draggable_end';
        if (this.props.isStart) {
            className = 'draggable_start';
        }

        return (
            <div
                className={'start_marker ' + className}
                style={{ left: this.props.position + '%' }}>
                I
            </div>
        );
    }
}

CropMarker.propTypes = {
    position: React.PropTypes.number,
    isStart: React.PropTypes.bool,
    cropsChanged: React.PropTypes.func,
};

export default CropMarker;
