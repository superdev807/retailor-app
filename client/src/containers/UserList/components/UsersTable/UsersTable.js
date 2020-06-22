import React, { useState, useEffect } from 'react';
import UserDialog from '../UserDialog';
import NormalDialog from 'components/NormalDialog';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Avatar, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
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
    avatar: {
        marginRight: theme.spacing(2),
    },
    actions: {
        justifyContent: 'flex-end',
    },
    actionCell: {
        display: 'flex',
    },
}));

const UsersTable = (props) => {
    const {
        className,
        users,
        updateUserFunc,
        deleteUserFunc,
        updateSuccess,
        updatePending,
        deleteSuccess,
        deletePending,
        me,
        ...rest
    } = props;

    const [curUser, setCurUser] = useState({});
    const [editOpen, setEditOpen] = useState(false);
    const [removeDlgOpen, setRemoveDlgOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        if (deleteSuccess || !deletePending) setRemoveDlgOpen(false);
    }, [deleteSuccess, deletePending]);

    const openEditDlg = (user) => () => {
        setCurUser(user);
        setEditOpen(true);
    };

    const openRemoveDlg = (user) => () => {
        setCurUser(user);
        setRemoveDlgOpen(true);
    };

    const handleRemoveUser = () => {
        deleteUserFunc({ data: curUser });
        // deleteApartmentFunc({ data: { id: curApartment._id } });
    };

    const handleRemoveClose = () => {
        setRemoveDlgOpen(false);
        setCurUser({});
    };

    const isEditable = (user) => {
        return user.email === me.email;
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Registered at</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow className={classes.tableRow} hover key={`user-${index}`}>
                                        <TableCell>
                                            <div className={classes.nameContainer}>
                                                <Avatar className={classes.avatar} src={user.avatarUrl}>
                                                    {user.firstName}
                                                </Avatar>
                                                <Typography variant="body1">
                                                    {user.firstName} {user.lastName}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{moment(user.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>
                                            <div className={classes.actionCell}>
                                                <IconButton
                                                    aria-label="edit"
                                                    size="small"
                                                    onClick={openEditDlg(user)}
                                                    disabled={isEditable(user)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="edit"
                                                    size="small"
                                                    onClick={openRemoveDlg(user)}
                                                    disabled={isEditable(user)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
            <UserDialog
                open={editOpen}
                setOpen={setEditOpen}
                title={'Update'}
                curUser={curUser}
                handleSaveAction={updateUserFunc}
                actionSucceed={updateSuccess}
                actionPending={updatePending}
            />
            <NormalDialog
                open={removeDlgOpen}
                handleAgreeAction={handleRemoveUser}
                handleCancelAction={handleRemoveClose}
                title={'user'}
                processing={deletePending}
            />
        </Card>
    );
};

UsersTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired,
};

export default UsersTable;
