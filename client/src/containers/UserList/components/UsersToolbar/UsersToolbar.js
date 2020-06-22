import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import UserDialog from '../UserDialog';

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    spacer: {
        flexGrow: 1,
    },
    importButton: {
        marginRight: theme.spacing(1),
    },
    exportButton: {
        marginRight: theme.spacing(1),
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const UsersToolbar = (props) => {
    const { className, createUserFunc, createSuccess, createPending, ...rest } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained" onClick={handleClick}>
                    Add user
                </Button>
                <UserDialog
                    open={open}
                    setOpen={setOpen}
                    title={'Add'}
                    curUser={{}}
                    handleSaveAction={createUserFunc}
                    actionSucceed={createSuccess}
                    actionPending={createPending}
                />
            </div>
        </div>
    );
};

UsersToolbar.propTypes = {
    className: PropTypes.string,
};

export default UsersToolbar;
