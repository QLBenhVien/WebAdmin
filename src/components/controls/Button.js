import React from 'react';
import { Button as MuiButton } from '@mui/material';  // Nhập Button từ thư viện Material-UI
import { styled } from '@mui/material/styles';  // Sử dụng styled API để tạo các component tùy chỉnh

// Tùy chỉnh Button bằng styled
const CustomButton = styled(MuiButton)(({ theme }) => ({
    margin: theme.spacing(1),  // Thêm khoảng cách giữa các nút
    textTransform: 'none',      // Bỏ viết hoa cho chữ trong nút
}));

// Component Button tùy chỉnh
export default function Button(props) {
    // Destructuring các props
    const { text, size, color, variant, onClick, ...other } = props;

    return (
        <CustomButton
            variant={variant || "contained"}  // Nếu không có variant, sử dụng mặc định là "contained"
            size={size || "large"}            // Nếu không có size, sử dụng mặc định là "large"
            color={color || "primary"}         // Nếu không có color, sử dụng mặc định là "primary"
            onClick={onClick}                  // Hàm xử lý sự kiện khi nút được nhấn
            {...other}                         // Truyền các props khác nếu có
        >
            {/* Nội dung văn bản hiển thị trên nút */}
            {text}  
        </CustomButton>
    );
}
