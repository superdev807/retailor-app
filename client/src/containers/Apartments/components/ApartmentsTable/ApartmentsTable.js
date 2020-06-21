import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { API_SUCCESS, API_FAIL } from 'redux/api/request';
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
    TablePagination,
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import NormalDialog from 'components/NormalDialog';
import Notification from 'components/Notification';
import { useStyles } from './styles';

const ApartmentsTable = (props) => {
    const {
        className,
        pageNum,
        pageCnt,
        apartments,
        updateApartmentFunc,
        deleteApartmentFunc,
        readApartmentsFunc,
        rowsPerPage,
        setRowCount,
        setPageNumber,
        userRole,
        successMessage,
        failedMessage,
        setSuccessMessage,
        setFailedMessage,
        readingApartments,
        deletingApartment,
        apartmentDeletingState,
        ...rest
    } = props;

    const classes = useStyles();

    const handlePageChange = (event, page) => {
        setPageNumber(page + 1);
    };

    const handleRowsPerPageChange = (event) => {
        setRowCount(parseInt(event.target.value));
    };

    const [removeDlgOpen, setRemoveDlgOpen] = useState(false);
    const [curApartment, setCurApartment] = useState({});

    const openRemoveDlg = (apartment) => () => {
        setRemoveDlgOpen(true);
        setCurApartment(apartment);
    };

    const handleRemoveApartment = () => {
        deleteApartmentFunc({ data: { id: curApartment._id } });
    };

    const handleRemoveClose = () => {
        setRemoveDlgOpen(false);
        setCurApartment({});
    };

    const failedMessageRemove = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFailedMessage('');
    };

    const successMessageRemove = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessMessage('');
    };

    useEffect(() => {
        if (apartmentDeletingState === API_SUCCESS) {
            if (pageCnt === (pageNum - 1) * rowsPerPage + 1) {
                setPageNumber(pageNum - 1);
            } else readApartmentsFunc({ pageNum, pageLimit: rowsPerPage });
            handleRemoveClose();
        }
    }, [apartmentDeletingState]);

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <Notification message={successMessage} snackBarClose={successMessageRemove} msgType={'success'} />
            <Notification error={failedMessage} snackBarClose={failedMessageRemove} msgType={'error'} />
            {readingApartments && <h3 className={classes.loading}>{' Loading...'}</h3>}
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table className={classes.mainTable}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Floor Area Size(m²)</TableCell>
                                    <TableCell>Price per month($)</TableCell>
                                    <TableCell>Number of rooms</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Added date</TableCell>
                                    <TableCell>Current State</TableCell>
                                    <TableCell>Associated Realtor</TableCell>
                                    {userRole !== 'client' && <TableCell>Action</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {apartments.slice(rowsPerPage * (pageNum - 1), rowsPerPage * pageNum).map((apartment, index) => (
                                    <TableRow className={classes.tableRow} key={`apartment-${index}`}>
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
                                        <TableCell className={classes.normalTableCell}>{apartment.associated_realtor.userName}</TableCell>
                                        {userRole !== 'client' && (
                                            <TableCell className={classes.normalTableCell}>
                                                <div className={classes.actionCell}>
                                                    <IconButton aria-label="edit" size="small">
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="edit" size="small" onClick={openRemoveDlg(apartment)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        )}
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
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </CardActions>
            <NormalDialog
                open={removeDlgOpen}
                handleAgreeAction={handleRemoveApartment}
                handleCancelAction={handleRemoveClose}
                processing={deletingApartment}
            />
        </Card>
    );
};

ApartmentsTable.propTypes = {
    className: PropTypes.string,
    apartments: PropTypes.array.isRequired,
};

export default ApartmentsTable;
