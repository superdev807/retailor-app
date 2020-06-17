import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    grid: {
        height: '100%',
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px',
    },
    quoteText: {
        color: theme.palette.black,
        fontWeight: 300,
        backgroundColor: 'rgba(100, 100, 100, 0.8)',
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.black,
    },
    bio: {
        color: theme.palette.black,
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    logoImage: {
        marginLeft: theme.spacing(4),
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
        },
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    policyCheckbox: {
        marginLeft: '-14px',
    },
    signUpButton: {
        margin: theme.spacing(2, 0),
    },
    userSelectbox: {
        margin: theme.spacing(2, 0),
    },
}));
