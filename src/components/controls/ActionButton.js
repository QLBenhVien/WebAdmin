import { makeStyles } from '@mui/styles';
import React from 'react';
import { Button as MuiButton } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),  // Khoảng cách giữa các nút
        padding: 0,  // Loại bỏ padding để giữ nút nhỏ gọn
        width: '30px',  // Đặt chiều rộng của nút là 50px
        height: '30px', // Đặt chiều cao của nút
        borderRadius: '0px',  // Không có bo góc để giữ nút là hình vuông
        display: 'flex',
        alignItems: 'center',  // Canh giữa nội dung theo chiều dọc
        justifyContent: 'center',  // Canh giữa nội dung theo chiều ngang
        '&.MuiButton-primary': {  // Sử dụng tiền tố MuiButton-
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
        },
        '&.MuiButton-secondary': {  // Sử dụng tiền tố MuiButton-
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.main,
        },
    },
}));

export default function ActionButton(props) {
    const { color = 'primary', children, onClick } = props; // Mặc định color là 'primary'
    const classes = useStyles();

    return (
        <MuiButton
            className={`${classes.root} MuiButton-${color}`}  // Sử dụng class đúng
            onClick={onClick}
            
            style={{ minWidth: '0', width: '30px', height: '30px' }} // Thêm thuộc tính style ở đây
        >
            {React.cloneElement(children, { style: { fontSize: '16px' } })}  
        </MuiButton>
    );
}
