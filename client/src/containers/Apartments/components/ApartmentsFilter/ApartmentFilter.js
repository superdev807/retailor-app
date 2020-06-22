import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import NumberFormatCustom from 'components/NumberFormatCustom';
import { useStyles } from './styles';

const ApartmentFilter = (props) => {
    const classes = useStyles();
    const { setFilterValuesFunc, filterValues } = props;
    const handleChange = (event) => {
        setFilterValuesFunc({
            ...filterValues,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <Grid container spacing={4}>
            <Grid item lg={4} md={12} xl={4} xs={12}>
                <div className={classes.subSection}>
                    Floor Area Size:
                    <TextField
                        name="floorAreaSizeMin"
                        id="floorAreaSizeMin"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                    ~
                    <TextField
                        name="floorAreaSizeMax"
                        id="floorAreaSizeMax"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                </div>
            </Grid>
            <Grid item lg={4} md={12} xl={4} xs={12}>
                <div className={classes.subSection}>
                    Price per month:
                    <TextField
                        name="pricePerMonthMin"
                        id="pricePerMonthin"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                    ~
                    <TextField
                        name="pricePerMonthMax"
                        id="pricePerMonthMax"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                </div>
            </Grid>
            <Grid item lg={4} md={12} xl={4} xs={12}>
                <div className={classes.subSection}>
                    Number of rooms:
                    <TextField
                        name="numberOfRoomsMin"
                        id="numberOfRoomsMin"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                    ~
                    <TextField
                        name="numberOfRoomsMax"
                        id="numberOfRoomsMax"
                        InputProps={{ inputComponent: NumberFormatCustom, classes: { input: classes.textField } }}
                        onChange={handleChange}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default ApartmentFilter;
