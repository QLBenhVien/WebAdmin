import { Card, Paper, Typography } from "@mui/material"; // Nhập các thành phần từ MUI
import { styled } from "@mui/system"; // Nhập hàm styled để tùy chỉnh các thành phần
import React from "react";

// Tạo Root component sử dụng Paper với màu nền tùy chỉnh
const Root = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fdfdff", // Màu nền của Root
}));

// Tạo PageHeaderContainer để bố trí tiêu đề và biểu tượng
const PageHeaderContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4), // Padding cho container
  display: "flex", // Sử dụng flexbox để căn giữa các thành phần bên trong
  marginBottom: theme.spacing(3), // Khoảng cách dưới
}));

// Tạo PageIcon sử dụng Card để hiển thị biểu tượng
const PageIcon = styled(Card)(({ theme }) => ({
  display: "inline-block", // Hiển thị biểu tượng theo kiểu inline-block
  padding: theme.spacing(2), // Padding cho biểu tượng
  color: "#3c44b1", // Màu của biểu tượng
}));

// Tạo PageTitle để hiển thị tiêu đề và phụ đề
const PageTitle = styled("div")(({ theme }) => ({
  paddingLeft: theme.spacing(4), // Padding bên trái
  "& .MuiTypography-subtitle2": {
    // Thay đổi kiểu cho subtitle2
    opacity: "0.6", // Độ mờ cho subtitle
  },
}));

export default function PageHeader(props) {
  const { title, subTitle, icon } = props; // Lấy các props từ component

  return (
    <Root elevation={0} square>
      {" "}
      {/* Sử dụng Root với độ cao 0 và hình vuông */}
      <PageHeaderContainer>
        {" "}
        {/* Container cho tiêu đề và biểu tượng */}
        <PageIcon>
          {" "}
          {/* Hiển thị biểu tượng */}
          {icon}
        </PageIcon>
        <PageTitle>
          {" "}
          {/* Hiển thị tiêu đề và phụ đề */}
          <Typography variant="h6" component="div">
            {" "}
            {/* Tiêu đề */}
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {" "}
            {/* Phụ đề */}
            {subTitle}
          </Typography>
        </PageTitle>
      </PageHeaderContainer>
    </Root>
  );
}
