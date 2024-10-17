import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Tạo hook để định nghĩa style
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        borderRadius: '8px',
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    detail: {
        marginBottom: theme.spacing(1),
        fontSize: '1rem',
    },
}));

const EmployeeDetails = ({ employee }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.detail}><strong>Mã nhân viên:</strong> {employee.id}</Typography>
                    <Typography className={classes.detail}><strong>Tên:</strong> {employee.fullName}</Typography>
                    <Typography className={classes.detail}><strong>Email:</strong> {employee.email}</Typography>
                    <Typography className={classes.detail}><strong>Số điện thoại:</strong> {employee.mobile}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.detail}><strong>Địa chỉ:</strong> {employee.city}</Typography>
                    <Typography className={classes.detail}><strong>Giới tính:</strong> {employee.gender}</Typography>
                    <Typography className={classes.detail}><strong>Chức vụ:</strong> {employee.department}</Typography>
                    <Typography className={classes.detail}><strong>Ngày tạo:</strong> {employee.hireDate}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EmployeeDetails;