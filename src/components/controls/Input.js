import React from 'react';
import { TextField } from '@mui/material';  // Nhập TextField từ MUI để tạo input

export default function Input(props) {
    // Destructure các props được truyền vào
    const { name, label, value, error = null,email,pass, onChange, ...other } = props;
    
    return (
        <TextField
            variant="outlined"  // Sử dụng kiểu "outlined" cho TextField
            label={label}       // Gán label cho TextField
            name={name}         // Gán name cho TextField
            email={email}
            pass={pass}
            value={value}       // Gán giá trị hiện tại cho TextField
            onChange={onChange} // Gán hàm xử lý thay đổi cho TextField
            {...other}          // Truyền các props khác nếu có
            {...(error && { error: true, helperText: error })} // Nếu có lỗi, thêm thuộc tính error và helperText
        />
    );
}
