import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Avatar, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
    const { className, users, ...rest } = props;

    const classes = useStyles();

    const openEditDlg = (user) => {};

    const openRemoveDlg = (user) => {};

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
                                                <IconButton aria-label="edit" size="small" onClick={openEditDlg(user)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit" size="small" onClick={openRemoveDlg(user)}>
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
        </Card>
    );
};

UsersTable.propTypes = {
    className: PropTypes.string,
    users: PropTypes.array.isRequired,
};

export default UsersTable;
