import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
    crop_start: 0,
    crop_end: 100,
};

const store = createStore(
    rootReducer,
    defaultState,
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : f => f
    )
);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
