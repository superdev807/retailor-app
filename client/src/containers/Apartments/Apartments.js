import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { makeSelectAuthUser } from 'containers/App/redux/selectors';
import { makeSelectCreatingApartment, makeSelectApartments } from './redux/selector';
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
    const users = [];
    let key = 'Apartments';
    useInjectReducer({ key, reducer: ApartmentReducer });
    useInjectSaga({ key, saga: ApartmentSaga });
    const creatingApartment = useSelector(makeSelectCreatingApartment);
    const apartments = useSelector(makeSelectApartments);
    const dispatch = useDispatch();

    const createApartmentFunc = (data) => {
        dispatch(createApartment(data));
    };

    const readApartmentsFunc = () => {
        dispatch(readApartments());
    };

    const updateApartmentFunc = (data) => {
        dispatch(updateApartment(data));
    };

    const deleteApartmentFunc = (data) => {
        dispatch(deleteApartment(data));
    };

    useEffect(() => {
        readApartmentsFunc();
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
            <div className={classes.content}>
                <ApartmentsTable
                    apartments={apartments}
                    updateApartmentFunc={updateApartmentFunc}
                    deleteApartmentFunc={deleteApartmentFunc}
                />
            </div>
        </div>
    );
};

export default Apartments;
