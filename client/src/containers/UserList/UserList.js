import React, { useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UsersToolbar, UsersTable } from './components';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import {
    makeSelectUsers,
    makeSelectCreateSuccess,
    makeSelectCreatePending,
    makeSelectUpdateSuccess,
    makeSelectUpdatePending,
    makeSelectDeleteSuccess,
    makeSelectDeletePending,
} from './redux/selector';
import { createUser, updateUser, deleteUser, getUsers } from './redux/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const UserList = () => {
    const classes = useStyles();
    const history = useHistory();
    const authUser = useSelector(makeSelectAuthUser);
    const users = useSelector(makeSelectUsers);
    const createSuccess = useSelector(makeSelectCreateSuccess);
    const createPending = useSelector(makeSelectCreatePending);
    const updateSuccess = useSelector(makeSelectUpdateSuccess);
    const updatePending = useSelector(makeSelectUpdatePending);
    const deleteSuccess = useSelector(makeSelectDeleteSuccess);
    const deletePending = useSelector(makeSelectDeletePending);
    const dispatch = useDispatch();

    const reloadUsers = useCallback(() => {
        dispatch(getUsers({ role: authUser.role }));
    }, [dispatch, authUser]);

    useEffect(() => {
        reloadUsers();
    }, [reloadUsers]);

    useEffect(() => {
        if (authUser.role !== 'Administrator') {
            history.push('/apartment');
        }
    }, [authUser.role, history]);

    const createUserFunc = (data) => {
        dispatch(createUser(data));
    };

    const updateUserFunc = (data) => {
        dispatch(updateUser(data));
    };

    const deleteUserFunc = (data) => {
        dispatch(deleteUser(data));
    };

    return (
        <div className={classes.root}>
            <UsersToolbar createUserFunc={createUserFunc} createSuccess={createSuccess} createPending={createPending} />
            <div className={classes.content}>
                <UsersTable
                    me={authUser}
                    users={users}
                    updateUserFunc={updateUserFunc}
                    deleteUserFunc={deleteUserFunc}
                    updateSuccess={updateSuccess}
                    updatePending={updatePending}
                    deleteSuccess={deleteSuccess}
                    deletePending={deletePending}
                />
            </div>
        </div>
    );
};

export default UserList;
