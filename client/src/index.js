import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { StylesProvider } from '@material-ui/core/styles';

import App from 'containers/App';
import history from 'utils/history';
import configureStore from 'configureStore';
import muiTheme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import 'styles/global-styles.scss';

const store = configureStore({}, history);
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={muiTheme}>
                    <App />
                </ThemeProvider>
            </StylesProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
