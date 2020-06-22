import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import { useStyles } from './styles';

const LoadingIndicator = ({ center = true, className, fullscreen = true, size, thickness, ...props }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.center, classes.fullscreen, className)} {...props}>
            <CircularProgress color="primary" size={size} thickness={thickness} />
        </div>
    );
};

export default LoadingIndicator;
