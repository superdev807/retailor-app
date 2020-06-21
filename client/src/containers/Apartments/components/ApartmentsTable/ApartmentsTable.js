import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Card,
    CardActions,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination,
} from '@material-ui/core';

import { useStyles } from './styles';

const ApartmentsTable = (props) => {
    const { className, pageNum, pageCnt, apartments, updateApartmentFunc, deleteApartmentFunc, readApartmentsFunc, ...rest } = props;

    const classes = useStyles();

    const handlePageChange = (event, page) => {
        // setPage(page);
    };

    const handleRowsPerPageChange = (event) => {
        // setRowsPerPage(event.target.value);
    };
    console.log('>>>', apartments);

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Floor Area Size</TableCell>
                                    <TableCell>Price per month</TableCell>
                                    <TableCell>Number of rooms</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Added date</TableCell>
                                    <TableCell>Current State</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apartments.slice(0, 20).map((apartment, index) => (
                                    <TableRow className={classes.tableRow} hover key={`apartment-${index}`}>
                                        <TableCell className={classes.normalTableCell}>{apartment.name}</TableCell>
                                        <TableCell className={classes.descriptionCell}>{apartment.description}</TableCell>
                                        <TableCell className={classes.normalTableCell}>{apartment.pricePerMonth}</TableCell>
                                        <TableCell className={classes.normalTableCell}>{apartment.floorAreaSize}</TableCell>
                                        <TableCell className={classes.normalTableCell}>{apartment.numberOfRooms}</TableCell>
                                        <TableCell className={classes.normalTableCell}>{apartment.address}</TableCell>
                                        <TableCell className={classes.normalTableCell}>
                                            {moment(apartment.date).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell className={classes.normalTableCell}>{apartment.available_state}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <CardActions className={classes.actions}>
                <TablePagination
                    component="div"
                    count={pageCnt}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={pageNum - 1}
                    rowsPerPage={5}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
        </Card>
    );
};

ApartmentsTable.propTypes = {
    className: PropTypes.string,
    apartments: PropTypes.array.isRequired,
};

export default ApartmentsTable;
