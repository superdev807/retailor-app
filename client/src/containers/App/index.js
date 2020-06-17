import React from 'react';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
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
        </Switch>
    );
}
