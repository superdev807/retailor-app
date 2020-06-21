import { makeStyles } from '@material-ui/styles';
import { TextareaAutosize } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        width: '100%',
        overflow: 'auto',
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    actions: {
        justifyContent: 'flex-end',
    },
    normalTableCell: {
        width: '10%',
    },
    descriptionCell: {
        width: '30%',
    },
    actionCell: {
        display: 'flex',
    },
    loading: {
        margin: 10,
    },
    mainTable: {
        minWidth: 1050,
    },
}));
