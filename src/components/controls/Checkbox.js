import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material'; // Nhập các component từ Material-UI
import React from 'react';

// Component Checkbox tùy chỉnh
export default function Checkbox(props) {
    // Destructuring các props
    const { name, label, value, onChange } = props;
    
    // Chuyển đổi các tham số sự kiện thành định dạng chuẩn
    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value
        }
    });

    // Xử lý sự kiện khi checkbox thay đổi
    const handleChange = (event) => {
        if (onChange) {
            // Gọi hàm onChange với tham số là đối tượng sự kiện đã được chuyển đổi
            onChange(convertToDefEventPara(name, event.target.checked));
        }
    };

    return (
        <FormControl>
            <FormControlLabel
                control={
                    <MuiCheckbox
                        name={name}                // Tên của checkbox
                        color="primary"            // Màu sắc của checkbox
                        checked={value}            // Trạng thái đã chọn (checked)
                        onChange={handleChange}    // Hàm xử lý khi trạng thái checkbox thay đổi
                    />
                }
                label={label}                   // Nhãn hiển thị bên cạnh checkbox
            />
        </FormControl>
    );
}
