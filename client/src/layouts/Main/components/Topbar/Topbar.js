import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
}));

const Topbar = (props) => {
    const { className, onSidebarOpen, logout, ...rest } = props;

    const classes = useStyles();

    return (
        <AppBar {...rest} className={clsx(classes.root, className)}>
            <Toolbar>
                <img alt="Logo" src="/images/logos/logo--white.svg" />
                <h1>Toptal Test</h1>
                <div className={classes.flexGrow} />
                <Hidden mdDown>
                    <IconButton className={classes.signOutButton} color="inherit" onClick={logout}>
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton className={classes.signOutButton} color="inherit" onClick={logout}>
                        <InputIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={onSidebarOpen}>
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
    logout: PropTypes.func,
};

export default Topbar;
