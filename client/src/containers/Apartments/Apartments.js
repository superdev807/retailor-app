import React from 'react';
import { makeStyles } from '@material-ui/styles';

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
    const classes = useStyles();
    const users = [];

    return (
        <div className={classes.root}>
            <ApartmentsToolbar />
            <div className={classes.content}>
                <ApartmentsTable users={users} />
            </div>
        </div>
    );
};

export default Apartments;
