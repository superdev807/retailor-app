import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import get from 'lodash/get';

import { setAuthenticated } from 'containers/App/redux/actions';

export default function configureStore(initialState = {}, history, injectedReducers) {
    let composeEnhancers = compose;

    const reduxSagaMonitorOptions = {};

    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
        }

        // NOTE: Uncomment the code below to restore support for Redux Saga
        // Dev Tools once it supports redux-saga version 1.x.x
        // if (window.__SAGA_MONITOR_EXTENSION__)
        //   reduxSagaMonitorOptions = {
        //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
        //   };
    }

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(createReducer(injectedReducers), initialState, composeEnhancers(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    if (get(initialState, 'global.isAuthenticated') === undefined) {
        store.dispatch(setAuthenticated());
    }

    return store;
}
