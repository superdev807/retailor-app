import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import Apartments from 'containers/Apartments';
import UserList from 'containers/UserList';
import RouteWithLayout from 'components/RouteWithLayout';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import NotFound from 'containers/NotFound';
import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getCookie } from 'utils/cookie';
import isEmpty from 'lodash/isEmpty';
import { getUserDetails } from './redux/actions';
import { getUsers } from 'containers/UserList/redux/actions';
import { makeSelectAuthUser, makeSelectIsAuthenticated } from './redux/selectors';
import saga from './redux/saga';
import userListSaga from 'containers/UserList/redux/saga';
import userListReducer from 'containers/UserList/redux/reducer';

export default function App() {
    useInjectSaga({ key: 'app', saga });
    useInjectReducer({ key: 'userlist', reducer: userListReducer });
    useInjectSaga({ key: 'userlist', saga: userListSaga });
    const authUser = useSelector(makeSelectAuthUser);
    const isAuthenticated = useSelector(makeSelectIsAuthenticated);
    const appToken = getCookie('appToken');
    const email = getCookie('email');
    const dispatch = useDispatch();

    useEffect(() => {
        if (appToken && isEmpty(authUser)) {
            dispatch(
                getUserDetails({
                    data: { email },
                })
            );
        }
    }, [isAuthenticated, authUser, dispatch, appToken, email]);

    useEffect(() => {
        if (appToken && !isEmpty(authUser)) {
            dispatch(getUsers({ role: authUser.role }));
        }
    }, [isAuthenticated, authUser, dispatch, appToken]);

    return (
        <Switch>
            <RouteWithLayout exact path="/" component={SignIn} layout={MinimalLayout} />
            <RouteWithLayout exact path="/sign-in" component={SignIn} layout={MinimalLayout} />
            <RouteWithLayout exact path="/sign-up" component={SignUp} layout={MinimalLayout} />
            <AuthenticatedRoute exact path="/apartment" component={Apartments} layout={MainLayout} />
            <AuthenticatedRoute exact path="/users" component={UserList} layout={MainLayout} />
            <RouteWithLayout exact path="/not-found" component={NotFound} layout={MinimalLayout} />
            <Redirect to="/not-found" />
        </Switch>
    );
}
