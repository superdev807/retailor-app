import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, CircularProgress } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}));

const Profile = ({ className, authUser = {}, ...rest }) => {
    const classes = useStyles();
    const avatar = '/images/avatars/avatar.png';
    const userName = authUser.firstName + ' ' + authUser.lastName;
    const role = authUser.role;

    return !isEmpty(authUser) ? (
        <div {...rest} className={clsx(classes.root, className)}>
            <Avatar alt="Person" className={classes.avatar} src={avatar} />
            <Typography className={classes.name} variant="h4">
                {userName}
            </Typography>
            <Typography variant="body2">{role}</Typography>
        </div>
    ) : (
        <div {...rest} className={clsx(classes.root, className)}>
            <CircularProgress size={40} />
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
};

export default Profile;
