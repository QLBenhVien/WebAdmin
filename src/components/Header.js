import { AppBar, Badge, Grid, IconButton, InputBase, Toolbar, styled } from '@mui/material'; // Nhập các thành phần từ MUI
import React from 'react';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'; // Nhập biểu tượng thông báo
import ChatIcon from '@mui/icons-material/Chat'; // Nhập biểu tượng chat
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'; // Nhập biểu tượng đăng xuất
import SearchIcon from '@mui/icons-material/Search'; // Nhập biểu tượng tìm kiếm

// Tạo một AppBar được tùy chỉnh
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#fff', // Màu nền của AppBar
    transform: 'translateZ(0)', // Đảm bảo hiệu ứng chuyển động mượt mà
}));

// Tạo một InputBase được tùy chỉnh cho trường tìm kiếm
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100], // Màu nền cho InputBase
    borderRadius: theme.shape.borderRadius, // Bo góc của InputBase
    padding: `0px ${theme.spacing(1)}px`, // Padding cho InputBase
    fontSize: '0.8rem', // Kích thước chữ trong InputBase
    opacity: '0.6', // Độ mờ
    paddingLeft: theme.spacing(2), // Padding bên trái
    '&:hover': {
        backgroundColor: '#f2f2f2' // Màu nền khi hover
    },
    '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(1) // Khoảng cách giữa biểu tượng và text
    }
}));

export default function Header() {
    return (
        <StyledAppBar position="static"> {/* AppBar với vị trí static */}
            <Toolbar> {/* Thanh công cụ chứa các thành phần */}
                <Grid container alignItems="center"> {/* Lưới để căn giữa các thành phần */}
                    <Grid item> {/* Ô cho trường tìm kiếm */}
                        <StyledInputBase 
                            placeholder="Search topics" // Placeholder cho trường tìm kiếm
                            startAdornment={<SearchIcon fontSize="small" />} // Biểu tượng tìm kiếm ở đầu trường
                        />
                    </Grid>
                    <Grid item sm></Grid> {/* Khoảng trống giữa trường tìm kiếm và các biểu tượng */}
                    <Grid item> {/* Ô chứa các biểu tượng */}
                        <IconButton> {/* Nút cho thông báo */}
                            <Badge badgeContent={4} color="secondary"> {/* Hiển thị badge thông báo */}
                                <CircleNotificationsIcon fontSize="small" /> {/* Biểu tượng thông báo */}
                            </Badge>
                        </IconButton>
                        <IconButton> {/* Nút cho chat */}
                            <Badge badgeContent={3} color="primary"> {/* Hiển thị badge chat */}
                                <ChatIcon fontSize="small" /> {/* Biểu tượng chat */}
                            </Badge>
                        </IconButton>
                        <IconButton> {/* Nút cho đăng xuất */}
                            <PowerSettingsNewIcon fontSize="small" /> {/* Biểu tượng đăng xuất */}
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </StyledAppBar>
    );
}
