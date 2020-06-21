import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Map from 'containers/Map';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import {
    makeSelectCreatingApartment,
    makeSelectReadingApartment,
    makeSelectDeletingApartment,
    makeSelectApartmentCreatingState,
    makeSelectApartmentReadingState,
    makeSelectApartmentDeletingState,
    makeSelectApartments,
    makeSelectPageNum,
    makeSelectTotalLimit,
    makeSelectRowsPerPage,
    makeSelectSuccessMsg,
    makeSelectFailedMsg,
} from './redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentsToolbar, ApartmentsTable } from './components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
    createApartment,
    readApartments,
    updateApartment,
    deleteApartment,
    setRowsPerPage,
    setPageNum,
    setApartmentCreatingState,
    setSuccessMsg,
    setFailedMsg,
} from './redux/actions';

import ApartmentReducer from './redux/reducer';
import ApartmentSaga from './redux/saga';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        marginTop: theme.spacing(2),
    },
}));

const Apartments = () => {
    const authUser = useSelector(makeSelectAuthUser);
    const classes = useStyles();
    let key = 'Apartments';
    useInjectReducer({ key, reducer: ApartmentReducer });
    useInjectSaga({ key, saga: ApartmentSaga });
    const creatingApartment = useSelector(makeSelectCreatingApartment);
    const readingApartments = useSelector(makeSelectReadingApartment);
    const deletingApartment = useSelector(makeSelectDeletingApartment);
    const apartments = useSelector(makeSelectApartments);
    const pageNum = useSelector(makeSelectPageNum);
    const pageCnt = useSelector(makeSelectTotalLimit);
    const rowsPerPage = useSelector(makeSelectRowsPerPage);
    const apartmentCreatingState = useSelector(makeSelectApartmentCreatingState);
    const apartmentDeletingState = useSelector(makeSelectApartmentDeletingState);
    const successMsg = useSelector(makeSelectSuccessMsg);
    const failedMsg = useSelector(makeSelectFailedMsg);
    const dispatch = useDispatch();

    const createApartmentFunc = (data) => {
        dispatch(createApartment(data));
    };

    const readApartmentsFunc = (data) => {
        dispatch(readApartments({ data }));
    };

    const updateApartmentFunc = (data) => {
        dispatch(updateApartment(data));
    };

    const deleteApartmentFunc = (data) => {
        dispatch(deleteApartment(data));
    };

    const setRowCount = (data) => {
        dispatch(setRowsPerPage(data));
    };

    const setPageNumber = (data) => {
        dispatch(setPageNum(data));
    };

    const setApartmentCreatingStateFunc = (data) => {
        dispatch(setApartmentCreatingState(data));
    };

    const setSuccessMessage = (data) => {
        dispatch(setSuccessMsg(data));
    };

    const setFailedMessage = (data) => {
        dispatch(setFailedMsg(data));
    };

    const getLocations = (datas) => {
        return datas.map((data) => {
            return { lat: data.latitude, lng: data.longitude };
        });
    };

    useEffect(() => {
        readApartmentsFunc({ pageNum, pageLimit: rowsPerPage });
    }, [pageNum, rowsPerPage, pageCnt]);

    return (
        <div className={classes.root}>
            {authUser.role !== 'client' && (
                <ApartmentsToolbar
                    role={authUser.role}
                    email={authUser.email}
                    userName={authUser.firstName + ' ' + authUser.lastName}
                    creatingApartment={creatingApartment}
                    createApartment={createApartmentFunc}
                    readApartments={readApartmentsFunc}
                    pageNum={pageNum}
                    rowsPerPage={rowsPerPage}
                    apartmentCreatingState={apartmentCreatingState}
                    setApartmentCreatingStateFunc={setApartmentCreatingStateFunc}
                />
            )}
            <Grid container spacing={4}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <div className={classes.content}>
                        <ApartmentsTable
                            apartments={apartments}
                            pageNum={pageNum}
                            pageCnt={pageCnt}
                            rowsPerPage={rowsPerPage}
                            userRole={authUser.role}
                            setPageNumber={setPageNumber}
                            setRowCount={setRowCount}
                            readApartmentsFunc={readApartmentsFunc}
                            updateApartmentFunc={updateApartmentFunc}
                            deleteApartmentFunc={deleteApartmentFunc}
                            apartmentDeletingState={apartmentDeletingState}
                            readingApartments={readingApartments}
                            deletingApartment={deletingApartment}
                            successMessage={successMsg}
                            failedMessage={failedMsg}
                            setSuccessMessage={setSuccessMessage}
                            setFailedMessage={setFailedMessage}
                        />
                    </div>
                </Grid>
                <Grid item lg={4} md={12} xl={3} xs={12}>
                    <Map locations={getLocations(apartments)} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Apartments;
