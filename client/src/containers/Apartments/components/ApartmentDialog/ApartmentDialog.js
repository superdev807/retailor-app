import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { DialogTitle, DialogContent, DialogActions } from 'components/DialogSubComponents';
import NumberFormatCustom from 'components/NumberFormatCustom';
import { Button, Dialog, TextField, RadioGroup, FormControlLabel, Radio, NativeSelect, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import validate from 'validate.js';
import isEmpty from 'lodash/isEmpty';
import { schema, addressSchema, geoCodeSchema } from './schema';
import { useStyles } from './styles';

const ApartmentDialog = (props) => {
    const classes = useStyles();
    const {
        title,
        role,
        email,
        userName,
        fetching,
        handleSaveAction,
        pageNum,
        rowsPerPage,
        readApartments,
        actionSucceed,
        orgApartment,
        open = false,
        realtors = [],
        setOpen,
    } = props;
    const [geoCodeError, setGeoCodeError] = useState('');

    const [formState, setFormState] = useState({
        isValid: false,
        values: { geoCodeType: 'Address' },
        touched: {},
        errors: {},
    });

    useEffect(() => {
        Geocode.setApiKey('AIzaSyDUEBAo6yr2PPV0dY2GjXWQSFp_oALKyoc');
        Geocode.setLanguage('en');
    }, []);

    useEffect(() => {
        if (open) {
            setFormState({
                isValid: false,
                values: { geoCodeType: 'Address' },
                touched: {},
                errors: {},
            });
            setGeoCodeError('');
        }
    }, [open]);

    useEffect(() => {
        if (open && title === 'Update' && !isEmpty(orgApartment)) {
            setFormState({
                isValid: false,
                values: {
                    ...orgApartment,
                    geoCodeType: 'Address',
                },
                touched: {
                    name: true,
                    description: true,
                    floorAreaSize: true,
                    pricePerMonth: true,
                    numberOfRooms: true,
                    address: true,
                    latitude: true,
                    longitude: true,
                },
                errors: {},
            });
        }
    }, [open, title, orgApartment]);

    useEffect(() => {
        if (actionSucceed) {
            readApartments({ pageNum, pageLimit: rowsPerPage });
            setOpen(false);
        }
    }, [actionSucceed]);

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

    const fieldValue = (field) => (formState.values[field] ? formState.values[field] : '');

    const handleSave = () => {
        const geoSchema = formState.values['geoCodeType'] === 'Address' ? addressSchema : geoCodeSchema;
        const errors = validate(formState.values, { ...schema, ...geoSchema });
        const associated_realtor =
            formState.values.associated_realtor && !isEmpty(formState.values.associated_realtor)
                ? formState.values.associated_realtor
                : { email, userName };

        setFormState((formState) => {
            return {
                ...formState,
                isValid: errors ? false : true,
                errors: errors || {},
                touched: {
                    name: true,
                    description: true,
                    floorAreaSize: true,
                    pricePerMonth: true,
                    numberOfRooms: true,
                    address: true,
                    latitude: true,
                    longitude: true,
                },
            };
        });
        if (errors) return;

        if (formState.values['geoCodeType'] === 'Address' && orgApartment.address !== formState.values['address']) {
            Geocode.fromAddress(formState.values['address']).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setFormState((formState) => ({
                        ...formState,
                        values: {
                            ...formState.values,
                            latitude: lat,
                            longitude: lng,
                        },
                    }));
                    const { geoCodeType, ...rest } = { ...formState.values, latitude: lat, longitude: lng };
                    handleSaveAction({ data: { ...orgApartment, ...rest, associated_realtor } });
                },
                (error) => {
                    console.log('invalid address');
                    setGeoCodeError('Invalid Address');
                }
            );
        } else if (
            formState.values['geoCodeType'] === 'Geo code' &&
            (orgApartment.latitude !== formState.values['latitude'] || orgApartment.longitude !== formState.values['longitude'])
        ) {
            Geocode.fromLatLng(formState.values['latitude'], formState.values['longitude']).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    setFormState((formState) => ({
                        ...formState,
                        values: {
                            ...formState.values,
                            address: address,
                        },
                    }));
                    const { geoCodeType, ...rest } = { ...formState.values, address };
                    handleSaveAction({ data: { ...orgApartment, ...rest, associated_realtor } });
                },
                (error) => {
                    console.log('invalid lat or longitute');
                    setGeoCodeError('Invalid latitude or longitute');
                }
            );
        } else {
            const { geoCodeType, ...rest } = { ...formState.values };
            handleSaveAction({ data: { ...orgApartment, ...rest, associated_realtor } });
        }
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

    const handleAssociatedRealtorChange = (event) => {
        event.persist && event.persist();
        const realtor = realtors[event.target.selectedIndex];
        const associated_realtor = { email: event.target.value, userName: realtor.firstName + ' ' + realtor.lastName };
        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                associated_realtor,
            },
        }));
    };

    const getAssociatedRealtorValue = (apartment) => {
        if (apartment.associated_realtor) return apartment.associated_realtor.email;
        return 'Invalid Realtor';
    };

    const getRealtorName = (realtor) => {
        return realtor && realtor.firstName + ' ' + realtor.lastName;
    };

    return (
        <Dialog
            open={open}
            PaperProps={{ classes: { root: classes.dialogPaper } }}
            aria-labelledby="max-width-dialog-title"
            fullWidth={true}>
            <DialogTitle id="max-width-dialog-title">{`${title} Apartment`}</DialogTitle>
            <DialogContent dividers>
                <div className={classes.form} noValidate>
                    <div className={classes.formControl}>
                        <TextField
                            label="name"
                            placeholder="name"
                            name="name"
                            error={hasError('name')}
                            value={fieldValue('name')}
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
                            value={fieldValue('description')}
                            classes={{ root: classes.normalText }}
                            InputProps={{ classes: { input: classes.description } }}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.formControl}>
                        <TextField
                            label="Floor Area Size"
                            name="floorAreaSize"
                            id="floorAreaSize"
                            error={hasError('floorAreaSize')}
                            helperText={hasError('floorAreaSize') ? formState.errors.floorAreaSize[0] : null}
                            value={fieldValue('floorAreaSize')}
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
                            value={fieldValue('pricePerMonth')}
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
                            value={fieldValue('numberOfRooms')}
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
                            error={hasError('address')}
                            helperText={hasError('address') ? formState.errors.address[0] : null}
                            value={fieldValue('address')}
                            classes={{ root: classes.subArea2 }}
                            disabled={formState.values.geoCodeType !== 'Address'}
                            onChange={handleChange}
                        />
                        <div className={clsx(classes.formControl, classes.subArea2)}>
                            <TextField
                                label="Latitude"
                                name="latitude"
                                id="latitude"
                                error={hasError('latitude')}
                                helperText={hasError('latitude') ? formState.errors.latitude[0] : null}
                                value={fieldValue('latitude')}
                                classes={{ root: classes.subArea2 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                disabled={formState.values.geoCodeType !== 'Geo code'}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Longitude"
                                name="longitude"
                                id="longitude"
                                error={hasError('longitude')}
                                helperText={hasError('longitude') ? formState.errors.longitude[0] : null}
                                value={fieldValue('longitude')}
                                classes={{ root: classes.subArea2 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
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
                    {geoCodeError && <div className={classes.formControl}>{geoCodeError}</div>}
                    {title === 'Update' && (
                        <div className={classes.formControl}>
                            <span>Available State:</span>
                            <NativeSelect
                                disableUnderline
                                id="available_state"
                                name="available_state"
                                onChange={handleChange}
                                className={classes.associated}
                                classes={{ root: classes.associatedInput }}
                                defaultValue={orgApartment.available_state}>
                                {['Available', 'Rented'].map((state, index) => (
                                    <option value={state} key={`availableState-${index}`}>
                                        {state}
                                    </option>
                                ))}
                            </NativeSelect>
                        </div>
                    )}
                    {role === 'Administrator' && (
                        <div className={classes.formControl}>
                            <span>Associated Realtor:</span>
                            <NativeSelect
                                disableUnderline
                                onChange={handleAssociatedRealtorChange}
                                id="associated_realtor"
                                name="associated_realtor"
                                className={classes.associated}
                                classes={{ root: classes.associatedInput }}
                                defaultValue={getAssociatedRealtorValue(orgApartment)}>
                                {realtors.map((realtor, index) => (
                                    <option value={realtor.email} key={`realtor-${index}`}>
                                        {getRealtorName(realtor)}
                                    </option>
                                ))}
                            </NativeSelect>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleSave} disabled={fetching} color="primary" variant="contained" startIcon={<SaveIcon />}>
                    {title} {fetching && <CircularProgress size={20} />}
                </Button>
                <Button autoFocus onClick={() => setOpen(false)} disabled={fetching} variant="contained">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApartmentDialog;
