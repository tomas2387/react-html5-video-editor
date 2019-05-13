function crop_start(state = [], action) {
    switch (action.type) {
        case 'CROPS_CHANGED':
            if (action.end) {
                console.log(action.end, state, action.end - state);
                if (action.end - state < 20) {
                    return action.end - 20;
                }
            }
            if (action.start) {
                return action.start;
            }
            return state;

        default:
            return state;
    }
}

export default crop_start;
