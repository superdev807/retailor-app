import React, { useState, useEffect } from 'react';
import Geocode from 'react-geocode';
import { DialogTitle, DialogContent, DialogActions } from 'components/DialogSubComponents';
import NumberFormatCustom from 'components/NumberFormatCustom';
import { Button, Dialog, TextField, RadioGroup, FormControlLabel, Radio, NativeSelect, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import validate from 'validate.js';
import { schema, addressSchema, geoCodeSchema } from './schema';
import { useStyles } from './styles';

const ApartmentDialog = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { title, role, email, userName, fetching, handleSaveAction, pageNum, rowsPerPage, readApartments, actionSucceed } = props;
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
        if (actionSucceed) {
            readApartments({ pageNum, pageLimit: rowsPerPage });
            handleClick();
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

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        const geoSchema = formState.values['geoCodeType'] === 'Address' ? addressSchema : geoCodeSchema;
        const errors = validate(formState.values, { ...schema, ...geoSchema });

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

        if (formState.values['geoCodeType'] === 'Address') {
            Geocode.fromAddress(formState.values['address']).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    console.log(lat, lng);
                    setFormState((formState) => ({
                        ...formState,
                        values: {
                            ...formState.values,
                            latitude: lat,
                            longitude: lng,
                        },
                    }));
                    const { geoCodeType, ...rest } = { ...formState.values, latitude: lat, longitude: lng };
                    handleSaveAction({ data: { ...rest, associated_realtor: { email, userName } } });
                },
                (error) => {
                    console.log('invalid address');
                    setGeoCodeError('Invalid Address');
                }
            );
        } else {
            Geocode.fromLatLng(formState.values['latitude'], formState.values['longitude']).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    console.log(address);
                    setFormState((formState) => ({
                        ...formState,
                        values: {
                            ...formState.values,
                            address: address,
                        },
                    }));
                    const { geoCodeType, ...rest } = { ...formState.values, address };
                    handleSaveAction({ data: { ...rest, associated_realtor: { email, userName } } });
                },
                (error) => {
                    console.log('invalid lat or longitute');
                    setGeoCodeError('Invalid latitude or longitute');
                }
            );
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

    return (
        <div>
            <Button color="primary" variant="contained" onClick={handleClick}>
                {`${title} Apartment`}
            </Button>
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
                        {role === 'Administrator' && (
                            <div className={classes.formControl}>
                                <span>Associated Realtor:</span>
                                <NativeSelect
                                    disableUnderline
                                    onChange={handleChange}
                                    className={classes.associated}
                                    classes={{ root: classes.associatedInput }}>
                                    <option value="realtor">{'Alex John'}</option>
                                    <option value="Admin">{'Alex John'}</option>
                                    <option value="client">{'Alex John'}</option>
                                </NativeSelect>
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave} disabled={fetching} color="primary" variant="contained" startIcon={<SaveIcon />}>
                        {title} {fetching && <CircularProgress size={20} />}
                    </Button>
                    <Button autoFocus onClick={handleClick} disabled={fetching} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ApartmentDialog;
