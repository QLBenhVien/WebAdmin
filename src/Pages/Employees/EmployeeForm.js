
import React, { useEffect, useState } from 'react'; // Nhập React và useState
import { Grid } from '@mui/material'; // Nhập Grid từ MUI để tạo layout
import useForm, { Form as FormComponent } from '../../components/useForm'; // Nhập hook useForm và component Form
import Control from '../../components/controls/Control'; // Nhập các điều khiển từ Control
import * as employeeService from "../../services/employeeService"; // Nhập các dịch vụ nhân viên
import { format } from 'date-fns';

// Danh sách giới tính
const genderItems = [
  { id: 'male', title: 'Nam' },
  { id: 'female', title: 'Nữ' },
  { id: 'other', title: 'Khác' }
];

// Giá trị khởi tạo cho form
const initialFValues = {
  id: 0,
  pass:'',
  fullName: '',
  email: '',
  mobile: '',
  city: '',
  gender: 'male',
  departmentId: '',
  
  hireDate: new Date(),
  isPermanent: false,
};

export default function EmployeeForm(props) {
  const {addOrEdit, recordForEdit } = props;

// Thêm hàm kiểm tra email
const isEmailExist = (email) => {
  // Lấy danh sách nhân viên từ service (giả sử có hàm này)
  const employees = employeeService.getAllEmployees();
  return employees.some(employee => employee.email === email);
};
// Hàm validate để kiểm tra hợp lệ các trường
const validate = (fieldValues = values) => {
  let temp = { ...errors }; // Tạo một bản sao của errors hiện tại
  
  // Kiểm tra mật khẩu
  if ('pass' in fieldValues)
      temp.pass = fieldValues.pass ? "" : "Không được để trống thông tin này";

  // Kiểm tra email
  if ('email' in fieldValues) {
      temp.email = fieldValues.email 
          ? (/$^|.+@.+..+/.test(fieldValues.email) 
              ? (isEmailExist(fieldValues.email) && (!recordForEdit || recordForEdit.email !== fieldValues.email) 
                  ? "Email đã tồn tại" 
                  : "") 
              : "Email không hợp lệ") 
          : "Không được để trống thông tin này";
  }

  // Kiểm tra số điện thoại
  if ('mobile' in fieldValues) {
      const phonePattern = /^\d{10}$/; // Định dạng số điện thoại 10 số
      temp.mobile = fieldValues.mobile === "" 
          ? "" // Không có lỗi nếu để trống
          : (phonePattern.test(fieldValues.mobile) ? "" : "Số điện thoại phải là 10 số");
  }

  // Kiểm tra phòng ban
  if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "Không được để trống thông tin này";

  setErrors({ // Cập nhật errors
      ...temp
  });
  
  // Kiểm tra nếu không có lỗi
  return Object.values(temp).every(x => x === "");
};


  // Gọi hook useForm để quản lý trạng thái form
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate); 

  // Hàm xử lý sự kiện khi submit form
  const handleSubmit = e => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    if (validate()) { // Nếu validate thành công
        addOrEdit(values,resetForm);
    }
  };
  useEffect(() => {
      if (recordForEdit != null)
          setValues({
            ...recordForEdit
        })
  }, [recordForEdit])
  return (
    <FormComponent onSubmit={handleSubmit}> {/* Component form */}
      <Grid container>
      
        <Grid item xs={6}>
          
          <Control.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Control.Input
            name="pass"
            label="Mật khẩu"
            value={values.pass}
            onChange={handleInputChange}
            error={errors.pass}
          />
          <Control.Input 
            name="fullName"
            label="Họ và tên"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Control.Input 
            name="mobile"
            label="Số điện thoại"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          
        </Grid>
        <Grid item xs={6}>
          <Control.Select
            name="departmentId"
            label="Chức vụ"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          />
         <Control.Input
            name="city" 
            label="Địa chỉ"
            value={values.city}
            onChange={handleInputChange}
          />
          <Control.RadioGroup
            name="gender"
            label="Giới tính"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          
          <Control.Input
             name="hireDate"
            label="Ngày tạo"
            value={values.hireDate ? format(new Date(values.hireDate), 'dd/MM/yyyy') : ''} // Định dạng ngày
            onChange={handleInputChange}
            disabled // Vô hiệu hóa ô nhập
          />

          {/* <Control.Checkbox
            name="isPermanent"
            label="Nhân viên chính thức"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
          <div>
            <Control.Button
              type="submit"
              text="Lưu"
            />
            <Control.Button
              color="default"
              text="Hủy"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </FormComponent>
  );
}
