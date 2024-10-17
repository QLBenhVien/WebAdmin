import React from "react";
import SlideMenu from '../../components/SlideMenu';
import { makeStyles } from '@mui/styles';
import Header from '../../components/Header';
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Patients from "../../Pages/Patients/Patients"; // Đổi sang component quản lý bệnh nhân

// Định nghĩa theme
const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
});

// CSS-in-JS với makeStyles
const useStyles = makeStyles({
    appMain: {
        paddingLeft: '320px',
        width: '100%',
    }
});

// Component QuanTriBenhNhan
const QuanTriBenhNhan = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <SlideMenu />
            <div className={classes.appMain}>
                <Header />
                <Patients /> {/* Sử dụng component quản lý bệnh nhân */}
            </div>
            <CssBaseline />
        </ThemeProvider>
    );
};

export default QuanTriBenhNhan;
