import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
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
    apartmentFilter: {
        width: '100%',
    },
    subSection: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
}));
