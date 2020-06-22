import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ApartmentDialog from '../ApartmentDialog';
import ApartmentFilter from '../ApartmentsFilter';

const useStyles = makeStyles((theme) => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(9),
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
        realtors,
        setFilterValuesFunc,
        filterValues,
        ...rest
    } = props;

    const classes = useStyles();

    const handleClick = () => {
        setOpen(true);
    };

    const [open, setOpen] = useState(false);

    return (
        <div {...rest} className={clsx(classes.root, className)}>
            <div className={classes.row}>
                <ApartmentFilter setFilterValuesFunc={setFilterValuesFunc} filterValues={filterValues} />
            </div>
            <div className={classes.row}>
                <span className={classes.spacer} />

                {role !== 'Client' && (
                    <Button color="primary" variant="contained" onClick={handleClick}>
                        Add Apartment
                    </Button>
                )}

                {role !== 'Client' && (
                    <ApartmentDialog
                        title={'Add'}
                        role={role}
                        email={role !== 'Administrator' ? email : realtors[0] ? realtors[0].email : ''}
                        userName={
                            role !== 'Administrator' ? userName : realtors[0] ? realtors[0].firstName + ' ' + realtors[0].lastName : ''
                        }
                        fetching={creatingApartment}
                        handleSaveAction={createApartment}
                        pageNum={pageNum}
                        rowsPerPage={rowsPerPage}
                        readApartments={readApartments}
                        actionSucceed={createSucceed}
                        orgApartment={{}}
                        open={open}
                        setOpen={setOpen}
                        realtors={realtors}
                    />
                )}
            </div>
        </div>
    );
};

ApartmentsToolbar.propTypes = {
    className: PropTypes.string,
};

export default ApartmentsToolbar;
