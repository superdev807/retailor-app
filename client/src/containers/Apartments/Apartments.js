import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Map from 'containers/Map';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import { makeSelectCreatingApartment, makeSelectApartments, makeSelectPageNum, makeSelectPageCount } from './redux/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentsToolbar, ApartmentsTable } from './components';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createApartment, readApartments, updateApartment, deleteApartment } from './redux/actions';
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
    const apartments = useSelector(makeSelectApartments);
    const pageNum = useSelector(makeSelectPageNum);
    const pageCnt = useSelector(makeSelectPageCount);
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

    const getLocations = (datas) => {
        return datas.map((data) => {
            return { lat: data.latitude, lng: data.longitude };
        });
    };

    useEffect(() => {
        readApartmentsFunc({ pageNum });
    }, []);

    return (
        <div className={classes.root}>
            {authUser.role !== 'client' && (
                <ApartmentsToolbar
                    role={authUser.role}
                    email={authUser.email}
                    creatingApartment={creatingApartment}
                    createApartment={createApartmentFunc}
                />
            )}
            <Grid container spacing={4}>
                <Grid item lg={8} md={12} xl={9} xs={12}>
                    <div className={classes.content}>
                        <ApartmentsTable
                            apartments={apartments}
                            pageNum={pageNum}
                            pageCnt={pageCnt}
                            readApartmentsFunc={readApartmentsFunc}
                            updateApartmentFunc={updateApartmentFunc}
                            deleteApartmentFunc={deleteApartmentFunc}
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
