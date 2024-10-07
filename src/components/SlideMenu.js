import React from "react";
import { Link } from "react-router-dom"; // Nhập Link để điều hướng
import { withStyles } from '@mui/styles';

const styles = {
    slideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#22668E',
    },
    menuItem: {
        padding: '10px 20px',
        color: '#fff',
        textDecoration: 'none',
    },
};

const SlideMenu = (props) => {
    const { classes } = props;

    return (
        <div className={classes.slideMenu}>
            <Link to="/quantri" className={classes.menuItem}>Quản lý Nhân viên</Link>
            <Link to="/quantriBN" className={classes.menuItem}>Quản lý Bệnh Nhân</Link>
        </div>
    );
}

export default withStyles(styles)(SlideMenu);
