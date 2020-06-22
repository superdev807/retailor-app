import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Map from 'containers/Map';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import { makeSelectRealtors } from 'containers/UserList/redux/selector';
import {
    makeSelectCreatingApartment,
    makeSelectReadingApartment,
    makeSelectDeletingApartment,
    makeSelectApartmentCreateSuccess,
    makeSelectApartmentDeleteSuccess,
    makeSelectApartmentUpdateSuccess,
    makeSelectApartments,
    makeSelectPageNum,
    makeSelectTotalLimit,
    makeSelectRowsPerPage,
    makeSelectSuccessMsg,
    makeSelectFailedMsg,
    makeSelectFilterValues,
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
    setSuccessMsg,
    setFailedMsg,
    setFilterValues,
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

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

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
    const prevPageNum = usePrevious(pageNum);
    const pageCnt = useSelector(makeSelectTotalLimit);
    const rowsPerPage = useSelector(makeSelectRowsPerPage);
    const createSucceed = useSelector(makeSelectApartmentCreateSuccess);
    const deleteSucceed = useSelector(makeSelectApartmentDeleteSuccess);
    const updateSucceed = useSelector(makeSelectApartmentUpdateSuccess);
    const successMsg = useSelector(makeSelectSuccessMsg);
    const failedMsg = useSelector(makeSelectFailedMsg);
    const realtors = useSelector(makeSelectRealtors);
    const filterValues = useSelector(makeSelectFilterValues);
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

    const setSuccessMessage = (data) => {
        dispatch(setSuccessMsg(data));
    };

    const setFailedMessage = (data) => {
        dispatch(setFailedMsg(data));
    };

    const setFilterValuesFunc = (data) => {
        dispatch(setFilterValues(data));
    };

    const getLocations = (datas) => {
        return datas.map((data) => {
            return { lat: data.latitude, lng: data.longitude };
        });
    };

    useEffect(() => {
        console.log(pageCnt, pageNum, rowsPerPage);
        if ((prevPageNum === undefined || prevPageNum < pageNum) && (pageCnt > (pageNum - 1) * rowsPerPage || !pageCnt)) {
            readApartmentsFunc({ pageNum, pageLimit: rowsPerPage });
        }
    }, [pageNum, rowsPerPage, pageCnt]);

    return (
        <div className={classes.root}>
            <ApartmentsToolbar
                role={authUser.role}
                email={authUser.email}
                userName={authUser.firstName + ' ' + authUser.lastName}
                creatingApartment={creatingApartment}
                createApartment={createApartmentFunc}
                readApartments={readApartmentsFunc}
                setFilterValuesFunc={setFilterValuesFunc}
                pageNum={pageNum}
                rowsPerPage={rowsPerPage}
                createSucceed={createSucceed}
                realtors={realtors}
                filterValues={filterValues}
            />
            <Grid container spacing={4}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <div className={classes.content}>
                        <ApartmentsTable
                            email={authUser.email}
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
                            deleteSucceed={deleteSucceed}
                            updateSucceed={updateSucceed}
                            readingApartments={readingApartments}
                            deletingApartment={deletingApartment}
                            successMessage={successMsg}
                            failedMessage={failedMsg}
                            setSuccessMessage={setSuccessMessage}
                            setFailedMessage={setFailedMessage}
                            realtors={realtors}
                            filterValues={filterValues}
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
