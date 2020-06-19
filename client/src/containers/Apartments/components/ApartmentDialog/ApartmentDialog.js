import React, { useState } from 'react';
import { DialogContentText, InputLabel, Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useStyles } from './styles';

const ApartmentDialog = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { title, handleClose } = props;
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div>
            <Button color="primary" variant="contained" onClick={handleClick}>
                {title}
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'} aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <InputLabel htmlFor="max-width"></InputLabel>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ApartmentDialog;
