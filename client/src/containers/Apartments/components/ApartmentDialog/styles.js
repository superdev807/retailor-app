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
    normalText: {
        width: '100%',
    },
    subArea1: {
        width: '32%',
        minHeight: 50,
    },
    subArea2: {
        width: '48%',
    },
    description: {
        minHeight: 100,
    },
    associated: {
        width: '70%',
        borderBottom: '1px solid grey',
    },
    associatedInput: {
        paddingLeft: 20,
    },
}));
