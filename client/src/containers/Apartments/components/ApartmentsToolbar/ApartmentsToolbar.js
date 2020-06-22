import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ApartmentDialog from '../ApartmentDialog';

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
        userName,
        creatingApartment,
        createApartment,
        pageNum,
        rowsPerPage,
        apartmentCreatingState,
        readApartments,
        createSucceed,
        ...rest
    } = props;

    const classes = useStyles();

    const handleClick = () => {
        setOpen(!open);
    };

    const [open, setOpen] = useState(false);

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <span className={classes.spacer} />
                <Button color="primary" variant="contained" onClick={handleClick}>
                    Add Apartment
                </Button>
                <ApartmentDialog
                    title={'Add'}
                    role={role}
                    email={email}
                    userName={userName}
                    fetching={creatingApartment}
                    handleSaveAction={createApartment}
                    pageNum={pageNum}
                    rowsPerPage={rowsPerPage}
                    readApartments={readApartments}
                    actionSucceed={createSucceed}
                    open={open}
                    setOpen={setOpen}
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
