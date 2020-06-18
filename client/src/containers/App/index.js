import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import RouteWithLayout from 'components/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';
import { useInjectSaga } from 'utils/injectSaga';

import saga from './redux/saga';

export default function App() {
    useInjectSaga({ key: 'app', saga });
    return (
        <Switch>
            <RouteWithLayout exact path="/" component={SignIn} layout={MinimalLayout} />
            <RouteWithLayout exact path="/sign-in" component={SignIn} layout={MinimalLayout} />
            <RouteWithLayout exact path="/sign-up" component={SignUp} layout={MinimalLayout} />
        </Switch>
    );
}
