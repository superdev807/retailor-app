import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Notification = ({ message = '', error = '', snackBarClose, msgType }) => {
    const notifyText = msgType === 'error' ? error : message;
    return (
        <Snackbar open={notifyText !== ''} autoHideDuration={5000} onClose={snackBarClose}>
            <Alert onClose={snackBarClose} severity={msgType}>
                {notifyText}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
