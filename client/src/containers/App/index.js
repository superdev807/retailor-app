import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import RouteWithLayout from 'components/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';

export default function App() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
            {/* <RouteWithLayout component={SignIn} exact layout={MinimalLayout} path="/sign-in" />
            <RouteWithLayout component={SignUp} exact layout={MinimalLayout} path="/sign-up" /> */}
        </Switch>
    );
}
