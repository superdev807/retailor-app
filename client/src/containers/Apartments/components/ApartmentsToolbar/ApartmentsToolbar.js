import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ApartmentsDialog from '../ApartmentDialog';

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    spacer: {
        flexGrow: 1,
    },
    searchInput: {
        marginRight: theme.spacing(1),
    },
}));

const ApartmentsToolbar = (props) => {
    const {
        className,
        role,
        email,
        creatingApartment,
        createApartment,
        pageNum,
        rowsPerPage,
        apartmentCreatingState,
        setApartmentCreatingStateFunc,
        readApartments,
        ...rest
    } = props;

    const classes = useStyles();

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <ApartmentsDialog
                    title={'Add'}
                    role={role}
                    email={email}
                    fetching={creatingApartment}
                    handleSaveAction={createApartment}
                    pageNum={pageNum}
                    rowsPerPage={rowsPerPage}
                    apartmentCreatingState={apartmentCreatingState}
                    setApartmentCreatingStateFunc={setApartmentCreatingStateFunc}
                    readApartments={readApartments}
                />
            </div>
            <div className={classes.row}></div>
        </div>
    );
};

ApartmentsToolbar.propTypes = {
    className: PropTypes.string,
};

export default ApartmentsToolbar;
