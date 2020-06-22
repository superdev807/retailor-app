import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        minWidth: 396,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    formControl: {
        minWidth: 120,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    userSelectbox: {
        margin: theme.spacing(2, 1),
    },
}));
