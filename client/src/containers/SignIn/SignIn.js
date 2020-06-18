import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { Grid, Button, TextField, Typography, Snackbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeSelectIsAuthenticated } from 'containers/App/redux/selectors';
import { login } from 'containers/App/redux/actions';
import { useStyles } from './styles';

const schema = {
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

const SignIn = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(makeSelectIsAuthenticated);
    const classes = useStyles();
    const [alertMsg, setAlertMsg] = useState('');
    const [error, setError] = useState(false);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    }, []);

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

    const handleSignIn = (event) => {
        if (!hasError('email') && !hasError('password')) {
            dispatch(
                login({
                    data: { email: formState.values.email, password: formState.values.password },
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
                        <div className={classes.contentBody}>
                            <Snackbar open={alertMsg !== ''} error={error} message={alertMsg} />
                            <div className={classes.form}>
                                <Typography className={classes.title} variant="h2">
                                    Sign in
                                </Typography>
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
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={handleSignIn}>
                                    Sign in now
                                </Button>
                                <Typography color="textSecondary" variant="body1">
                                    Don't have an account?
                                    <Link to="/sign-up" variant="h6">
                                        Sign up
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

SignIn.propTypes = {
    history: PropTypes.object,
};

export default SignIn;
