import { makeStyles } from '@material-ui/styles';
export const useStyles = makeStyles((theme) => ({
    root: {},
    content: {
        padding: 0,
    },
    inner: {
        minWidth: 1050,
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
}));
