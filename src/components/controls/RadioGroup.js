import { FormControl, FormControlLabel, FormLabel, RadioGroup as MuiRadioGroup, Radio } from '@mui/material';  // Nhập các thành phần từ MUI
import React from 'react';

export default function RadioGroup(props) {
  // Destructure các props được truyền vào
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl>  {/* Tạo FormControl để nhóm các radio button */}
      <FormLabel>{label}</FormLabel>  {/* Hiển thị nhãn cho nhóm radio button */}
      <MuiRadioGroup row  // Sử dụng RadioGroup từ MUI, hiển thị theo hàng
        name={name}       // Gán thuộc tính name cho RadioGroup
        value={value}     // Gán giá trị hiện tại cho RadioGroup
        onChange={onChange} // Gán hàm xử lý thay đổi cho RadioGroup
      >
        {items.map(  // Lặp qua mảng items để tạo radio buttons
          (item) => (
            <FormControlLabel
              key={item.id}          // Gán khóa cho mỗi radio button
              value={item.id}       // Gán giá trị cho radio button
              control={<Radio />}    // Sử dụng Radio từ MUI làm phần điều khiển
              label={item.title}     // Gán nhãn cho radio button
            />
          )
        )}
      </MuiRadioGroup>
    </FormControl>
  )
}
