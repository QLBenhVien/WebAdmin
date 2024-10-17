import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@mui/material'; // Nhập các thành phần từ MUI
import React from 'react';

export default function Select(props) {
    // Destructure các props được truyền vào
    const { name, label, value, error = null, onChange, options } = props;
    
    return (
        <FormControl variant='outlined' error={!!error}>  {/* Tạo FormControl với variant 'outlined' và xác định lỗi nếu có */}
            <InputLabel>{label}</InputLabel>  {/* Hiển thị nhãn cho Select */}
            <MuiSelect
                label={label}   // Gán nhãn cho Select
                name={name}     // Gán thuộc tính name cho Select
                value={value}   // Gán giá trị hiện tại cho Select
                onChange={onChange}  // Gán hàm xử lý thay đổi cho Select
            >
                <MenuItem value="">None</MenuItem>  {/* Tùy chọn mặc định không có giá trị */}
                {options.map((item) => (  // Lặp qua mảng options để tạo các MenuItem
                    <MenuItem key={item.id} value={item.id}>
                        {item.title}  {/* Hiển thị tiêu đề cho mỗi tùy chọn */}
                    </MenuItem>
                ))}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}  {/* Hiển thị thông báo lỗi nếu có */}
        </FormControl>
    );
}
