import React, { useState, useEffect } from 'react';
import { Button, Dialog, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { DialogTitle, DialogContent, DialogActions } from 'components/DialogSubComponents';
import NumberFormatCustom from 'components/NumberFormatCustom';
import clsx from 'clsx';
import validate from 'validate.js';
import { useStyles } from './styles';

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    description: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    floorArea: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    pricePerMonth: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    numberOfRooms: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const ApartmentDialog = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { title, handleClose } = props;

    const [formState, setFormState] = useState({
        isValid: false,
        values: { geoCodeType: 'Address' },
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

    const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => {
            return {
                ...formState,
                isValid: errors ? false : true,
                errors: errors || {},
                touched: {
                    name: true,
                    description: true,
                    floorArea: true,
                    pricePerMonth: true,
                    numberOfRooms: true,
                },
            };
        });
        if (errors) return;
    };

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

    return (
        <div>
            <Button color="primary" variant="contained" onClick={handleClick}>
                {title}
            </Button>
            <Dialog
                open={open}
                PaperProps={{ classes: { root: classes.dialogPaper } }}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                fullWidth={true}>
                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                <DialogContent dividers>
                    <div className={classes.form} noValidate>
                        <div className={classes.formControl}>
                            <TextField
                                label="name"
                                placeholder="name"
                                name="name"
                                error={hasError('name')}
                                helperText={hasError('name') ? formState.errors.name[0] : null}
                                classes={{ root: classes.normalText }}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="description"
                                multiline={true}
                                placeholder="description"
                                name="description"
                                error={hasError('description')}
                                helperText={hasError('description') ? formState.errors.description[0] : null}
                                classes={{ root: classes.normalText }}
                                InputProps={{ classes: { input: classes.description } }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.formControl}>
                            <TextField
                                label="Floor Area Size"
                                name="floorArea"
                                id="floorArea"
                                error={hasError('floorArea')}
                                helperText={hasError('floorArea') ? formState.errors.floorArea[0] : null}
                                classes={{ root: classes.subArea1 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Price Per Month"
                                name="pricePerMonth"
                                id="pricePerMonth"
                                error={hasError('pricePerMonth')}
                                helperText={hasError('pricePerMonth') ? formState.errors.pricePerMonth[0] : null}
                                classes={{ root: classes.subArea1 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Number of rooms"
                                name="numberOfRooms"
                                id="numberOfRooms"
                                error={hasError('numberOfRooms')}
                                helperText={hasError('numberOfRooms') ? formState.errors.numberOfRooms[0] : null}
                                classes={{ root: classes.subArea1 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={classes.formControl}>
                            <TextField
                                label="Address"
                                name="address"
                                id="address"
                                classes={{ root: classes.subArea2 }}
                                disabled={formState.values.geoCodeType !== 'Address'}
                                onChange={handleChange}
                            />
                            <div className={clsx(classes.formControl, classes.subArea2)}>
                                <TextField
                                    label="Latitude"
                                    name="Latitude"
                                    id="Latitude"
                                    classes={{ root: classes.subArea2 }}
                                    disabled={formState.values.geoCodeType !== 'Geo code'}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Longitude"
                                    name="Longitude"
                                    id="Longitude"
                                    classes={{ root: classes.subArea2 }}
                                    disabled={formState.values.geoCodeType !== 'Geo code'}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <RadioGroup
                            defaultValue="Address"
                            aria-label="geocode"
                            name="geoCodeType"
                            className={classes.formControl}
                            onChange={handleChange}>
                            <FormControlLabel value="Address" control={<Radio />} label="Address" className={classes.subArea2} />
                            <FormControlLabel value="Geo code" control={<Radio />} label="Geo Code" className={classes.subArea2} />
                        </RadioGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} color="primary" variant="contained" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                    <Button autoFocus onClick={handleClick} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ApartmentDialog;
