function crop_end(state = [], action) {
    switch (action.type) {
        case 'CROPS_CHANGED':
            if (action.start) {
                console.log(action.start, state, state - action.start);
                if (state - action.start < 20) {
                    return action.start + 20;
                }
            }
            if (action.end) {
                return action.end;
            }
            return state;

        default:
            return state;
    }
}

export default crop_end;
