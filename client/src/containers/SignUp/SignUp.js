import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { Grid, Button, IconButton, TextField, NativeSelect, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'containers/App/redux/actions';
import { useStyles } from './styles';

const schema = {
    firstName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    lastName: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 32,
        },
    },
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128,
        },
    },
};

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });
    const [alertMsg, setAlertMsg] = useState('');

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    const handleChange = (event) => {
        event.persist();

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = (event) => {
        if (!hasError('firstName') && !hasError('lastName') && !hasError('email') && !hasError('password')) {
            dispatch(
                signUp({
                    data: {
                        firstName: formState.values.firstName,
                        lastName: formState.values.lastName,
                        email: formState.values.email,
                        password: formState.values.password,
                    },
                    onFail: (err) => {
                        setAlertMsg(err.message);
                    },
                })
            );
        }
    };

    const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid className={classes.quoteContainer} item lg={5}>
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
                            <Typography className={classes.quoteText} variant="h1">
                                <b>Retailor Application</b>
                            </Typography>
                            <div className={classes.person}>
                                <Typography className={classes.name} variant="body1">
                                    <b>Daniel Jason</b>
                                </Typography>
                                <Typography className={classes.bio} variant="body2">
                                    <b>NodeJS | React | MongoDB</b>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon />
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <div className={classes.form}>
                                <Typography className={classes.title} variant="h2">
                                    Create new account
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Use your email to create new account
                                </Typography>
                                <TextField
                                    className={classes.textField}
                                    error={hasError('firstName')}
                                    fullWidth
                                    helperText={hasError('firstName') ? formState.errors.firstName[0] : null}
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.firstName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('lastName')}
                                    fullWidth
                                    helperText={hasError('lastName') ? formState.errors.lastName[0] : null}
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.lastName || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    fullWidth
                                    helperText={hasError('email') ? formState.errors.email[0] : null}
                                    label="Email address"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText={hasError('password') ? formState.errors.password[0] : null}
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <NativeSelect className={classes.userSelectbox}>
                                    <option>Client</option>
                                    <option>Retailor</option>
                                    <option>Administrator</option>
                                </NativeSelect>
                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSignUp}>
                                    Sign up now
                                </Button>
                                <Typography color="textSecondary" variant="body1">
                                    Have an account?{' '}
                                    <Link to="/sign-in" variant="h6">
                                        Sign in
                                    </Link>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignUp.propTypes = {
    history: PropTypes.object,
};

export default SignUp;
