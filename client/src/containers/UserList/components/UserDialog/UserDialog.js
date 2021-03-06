import React, { useState, useEffect } from 'react';
import { Button, Dialog, TextField, NativeSelect, CircularProgress } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogActions } from 'components/DialogSubComponents';
import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';
import { schema } from './schema';
import { useStyles } from './styles';

const UserDialog = (props) => {
    const classes = useStyles();
    const { open, setOpen, title, curUser, handleSaveAction, actionSucceed, actionPending } = props;
    const [formState, setFormState] = useState({
        isValid: false,
        values: { ...curUser, role: 'Client' },
        touched: {},
        errors: {},
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    useEffect(() => {
        if (open) {
            setFormState({
                isValid: false,
                values: {},
                touched: {},
                errors: {},
            });
        }
    }, [open]);

    useEffect(() => {
        if (open && !isEmpty(curUser))
            setFormState((formState) => ({
                ...formState,
                values: { role: 'Client', ...curUser, password: '' },
            }));
    }, [open, curUser]);

    useEffect(() => {
        if (actionSucceed) {
            setOpen(false);
        }
    }, [actionSucceed, setOpen]);

    const handleChange = (event) => {
        event.persist && event.persist();

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]: event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

    const handleSave = () => {
        const errors = validate(formState.values, schema);

        setFormState((formState) => {
            return {
                ...formState,
                isValid: errors ? false : true,
                errors: errors || {},
                touched: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    password: true,
                },
            };
        });
        if (errors) return;
        handleSaveAction({ data: { role: 'Client', ...formState.values } });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            PaperProps={{ classes: { root: classes.dialogPaper } }}
            aria-labelledby="max-width-dialog-title"
            fullWidth={true}>
            <DialogTitle id="max-width-dialog-title">{`${title} User`}</DialogTitle>
            <DialogContent dividers>
                <div className={classes.form} noValidate>
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
                    <NativeSelect
                        className={classes.userSelectbox}
                        onChange={handleChange}
                        name="role"
                        defaultValue={formState.values.role || 'Client'}>
                        <option>Client</option>
                        <option>Realtor</option>
                        <option>Administrator</option>
                    </NativeSelect>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleSave} disabled={actionPending} color="primary" variant="contained">
                    {title} {actionPending && <CircularProgress size={20} />}
                </Button>
                <Button autoFocus onClick={handleClose} disabled={actionPending} variant="contained">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDialog;
