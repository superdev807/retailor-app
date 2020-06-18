import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { getCookie } from 'utils/cookie';

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

const Profile = (props) => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const userName = getCookie('userName');
    const role = getCookie('role');
    const avatar = '/images/avatars/avatar.png';

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <Avatar alt="Person" className={classes.avatar} src={avatar} />
            <Typography className={classes.name} variant="h4">
                {userName}
            </Typography>
            <Typography variant="body2">{role}</Typography>
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
};

export default Profile;
