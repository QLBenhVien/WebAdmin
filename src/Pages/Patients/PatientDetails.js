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

const PatientDetails = ({ patient }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.detail}><strong>Mã bệnh nhân:</strong> {patient.id}</Typography>
                    <Typography className={classes.detail}><strong>Tên:</strong> {patient.fullName}</Typography>
                    <Typography className={classes.detail}><strong>Email:</strong> {patient.email}</Typography>
                    <Typography className={classes.detail}><strong>Số điện thoại:</strong> {patient.mobile}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography className={classes.detail}><strong>Địa chỉ:</strong> {patient.city}</Typography>
                    <Typography className={classes.detail}><strong>Giới tính:</strong> {patient.gender}</Typography>
                    <Typography className={classes.detail}><strong>Tình trạng:</strong> {patient.condition}</Typography>
                    <Typography className={classes.detail}><strong>Ngày nhập viện:</strong> {patient.admissionDate}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PatientDetails;
