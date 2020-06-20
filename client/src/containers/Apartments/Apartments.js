import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import { useSelector } from 'react-redux';
import { ApartmentsToolbar, ApartmentsTable } from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Apartments = () => {
    const authUser = useSelector(makeSelectAuthUser);
    const classes = useStyles();
    const users = [];

    return (
        <div className={classes.root}>
            {authUser.role !== 'client' && <ApartmentsToolbar role={authUser.role} email={authUser.email} />}
            <div className={classes.content}>
                <ApartmentsTable users={users} />
            </div>
        </div>
    );
};

export default Apartments;
