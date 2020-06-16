import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import SignIn from 'containers/SignIn';
import RouteWithLayout from 'components/RouteWithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';

export default function App() {
    return (
        <Switch>
            <RouteWithLayout component={SignIn} exact layout={MinimalLayout} />
        </Switch>
    );
}
