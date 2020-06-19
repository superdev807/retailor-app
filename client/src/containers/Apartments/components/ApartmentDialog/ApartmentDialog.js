import React, { useState } from 'react';
import { Button, Dialog, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { DialogTitle, DialogContent, DialogActions } from 'components/DialogSubComponents';
import NumberFormatCustom from 'components/NumberFormatCustom';
import clsx from 'clsx';
import { useStyles } from './styles';

const ApartmentDialog = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { title, handleClose } = props;
    const handleClick = () => {
        setOpen(!open);
    };

    const [formState, setFormState] = useState({
        isValid: false,
        values: { geoCodeType: 'Address' },
        touched: {},
        errors: {},
    });

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
                                classes={{ root: classes.subArea1 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Price Per Month"
                                name="pricePerMonth"
                                id="pricePerMonth"
                                classes={{ root: classes.subArea1 }}
                                InputProps={{ inputComponent: NumberFormatCustom }}
                                onChange={handleChange}
                                prefix="$"
                            />
                            <TextField
                                label="Number of rooms"
                                name="numberOfRooms"
                                id="numberOfRooms"
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
                            aria-label="gender"
                            name="geoCodeType"
                            className={classes.formControl}
                            onChange={handleChange}>
                            <FormControlLabel value="Address" control={<Radio />} label="Address" className={classes.subArea2} />
                            <FormControlLabel value="Geo code" control={<Radio />} label="Geo Code" className={classes.subArea2} />
                        </RadioGroup>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary" variant="contained" startIcon={<SaveIcon />}>
                        Save
                    </Button>
                    <Button autoFocus onClick={handleClose} variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ApartmentDialog;
