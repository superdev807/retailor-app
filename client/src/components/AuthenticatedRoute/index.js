import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { setKeyValToSessionStorage } from 'utils/sessionStorage';
import { STORAGE } from 'utils/constants';
import { makeSelectIsAuthenticated } from 'containers/App/redux/selectors';
import RouteWithLayout from '../RouteWithLayout';

const AuthenticatedRoute = ({ component, exact = true, path, layout }) => {
    const isAuthenticated = useSelector(makeSelectIsAuthenticated);

    if (!isAuthenticated) {
        //save where user came from so we can redirect them there after successful login
        setKeyValToSessionStorage(STORAGE.PATH_ORIGIN, window.location.pathname);
        return <Redirect to="/sign-in" />;
    } else {
        return <RouteWithLayout exact={exact} path={path} component={component} layout={layout} />;
    }
};

AuthenticatedRoute.propTypes = {
    component: PropTypes.func,
    exact: PropTypes.bool,
    path: PropTypes.string,
    layout: PropTypes.func,
};

export default AuthenticatedRoute;
