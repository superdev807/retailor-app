import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from 'containers/App/redux/actions';
import { Sidebar, Topbar, Footer } from './components';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64,
        },
    },
    shiftContent: {
        paddingLeft: 240,
    },
    content: {
        height: '100%',
    },
}));

const Main = (props) => {
    const { children } = props;
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true,
    });

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: isDesktop,
            })}>
            <Topbar onSidebarOpen={handleSidebarOpen} logout={handleLogout} />
            <Sidebar onClose={handleSidebarClose} open={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node,
};

export default Main;
