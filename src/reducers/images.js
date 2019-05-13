function images(state = [], action) {
    switch (action.type) {
        case 'IMG_INSERT':
            console.log(state, action);
            state.push(action.position);
            return state;

        default:
            return state;
    }
}

export default images;
