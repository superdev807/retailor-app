import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import { useSelector } from 'react-redux';
import { makeSelectUsers } from './redux/selector';

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

    return (
        <div className={classes.root}>
            <UsersToolbar />
            <div className={classes.content}>
                <UsersTable users={users} />
            </div>
        </div>
    );
};

export default UserList;
