import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, DialogActions } from 'components/DialogSubComponents';

const NormalDialog = (props) => {
    const { handleAgreeAction, handleCancelAction, open, processing, title } = props;
    return (
        <Dialog open={open} aria-labelledby="max-width-dialog-title" fullWidth={true}>
            <DialogTitle id="max-width-dialog-title">Do you want to remove this {title}?</DialogTitle>
            <DialogActions>
                <Button onClick={handleAgreeAction} color="primary" disabled={processing} autoFocus>
                    Yes
                </Button>
                <Button onClick={handleCancelAction} color="primary" disabled={processing}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NormalDialog;
