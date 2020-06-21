import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DialogTitle, DialogActions } from 'components/DialogSubComponents';

const NormalDialog = (props) => {
    const { handleAgreeAction, handleCancelAction, open, processing } = props;
    return (
        <Dialog open={open} aria-labelledby="max-width-dialog-title" fullWidth={true}>
            <DialogTitle id="max-width-dialog-title">Do you want to remove this apartment?</DialogTitle>
            <DialogActions>
                <Button onClick={handleCancelAction} color="primary" disabled={processing}>
                    No
                </Button>
                <Button onClick={handleAgreeAction} color="primary" disabled={processing} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NormalDialog;
