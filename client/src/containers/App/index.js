import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import Apartments from 'containers/Apartments';
import RouteWithLayout from 'components/RouteWithLayout';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import NotFound from 'containers/NotFound';
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
            <AuthenticatedRoute exact path="/apartment" component={Apartments} layout={MainLayout} />
            <RouteWithLayout exact path="/not-found" component={NotFound} layout={MinimalLayout} />
            <Redirect to="/not-found" />
        </Switch>
    );
}
