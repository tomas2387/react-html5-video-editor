import React from 'react';
import interact from 'interact.js';
import PropTypes from 'prop-types';

class CropMarker extends React.Component {
    componentDidMount() {
        function dragMoveListener(event) {
            const target = event.target;
            const x =
                (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;

            target.style.transform = 'translate(' + x + 'px, 0px)';

            target.setAttribute('data-x', x);
        }

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
                    this.props.cropsChanged(
                        'start',
                        parseFloat(target.getAttribute('data-x'))
                    );
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
                    this.props.cropsChanged(
                        'end',
                        parseFloat(target.getAttribute('data-x'))
                    );
                },
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.position !== nextProps.position;
    }

    render() {
        let className = 'end_marker draggable_end';
        let content = '<';
        if (this.props.isStart) {
            className = 'start_marker draggable_start';
            content = '>';
        }

        return (
            <div
                className={className}
                style={{
                    transform: 'translate(' + this.props.position + 'px, 0px)',
                }}
                data-x={this.props.position}>
                {content}
            </div>
        );
    }
}

CropMarker.propTypes = {
    position: PropTypes.number,
    isStart: PropTypes.bool,
    cropsChanged: PropTypes.func,
};

export default CropMarker;
