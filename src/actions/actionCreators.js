// increment
export function cropChanged(where, position) {
    return {
        type: 'CROPS_CHANGED',
        [where]: position,
    };
}
