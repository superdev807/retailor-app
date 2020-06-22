import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectUsers } from './redux/selector';
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
    const users = useSelector(makeSelectUsers);
    const dispatch = useDispatch();

    const createUserFunc = (data) => {
        dispatch(createUser(data));
    };

    const updateUserFunc = (data) => {
        dispatch(updateUser(data));
    };

    const deleteUserFunc = (data) => {
        dispatch(deleteUserFunc(data));
    };

    return (
        <div className={classes.root}>
            <UsersToolbar createUserFunc={createUserFunc} />
            <div className={classes.content}>
                <UsersTable users={users} updateUserFunc={updateUserFunc} deleteUserFunc={deleteUserFunc} />
            </div>
        </div>
    );
};

export default UserList;
