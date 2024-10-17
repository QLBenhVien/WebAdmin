import React, { useEffect } from 'react';
import useForm, { Form } from '../../components/useForm'; // Đảm bảo nhập đúng
import Controls from '../../components/controls/Control';

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    condition: '', // Tình trạng của bệnh nhân (Đang hoạt động, Đã vô hiệu hóa, ...)
};

export default function PatientForm(props) {
    const { addOrEdit, recordForEdit } = props;

    // Hàm validate kiểm tra các trường dữ liệu
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "Trường này là bắt buộc.";
        if ('email' in fieldValues)
            temp.email = (/^.+@.+..+/).test(fieldValues.email) ? "" : "Email không hợp lệ.";
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Số điện thoại không hợp lệ.";
        // Không cần validate "condition" vì không có yêu cầu đặc biệt
        setErrors({
            ...temp
        });
        return Object.values(temp).every(x => x === "");
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
    } = useForm(initialFValues, true, validate);

    // useEffect để điền thông tin bệnh nhân khi chỉnh sửa
    useEffect(() => {
        if (recordForEdit != null)
            setValues(recordForEdit);
    }, [recordForEdit]);

    // Xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Controls.Input
                name="fullName"
                label="Tên Bệnh Nhân"
                value={values.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
            />
            <Controls.Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                error={errors.email}
            />
            <Controls.Input
                name="mobile"
                label="Số Điện Thoại"
                value={values.mobile}
                onChange={handleInputChange}
                error={errors.mobile}
            />
            <Controls.Input
                name="condition"
                label="Tình Trạng"
                value={values.condition}
                onChange={handleInputChange}
            />
            <div>
                <Controls.Button
                    type="submit"
                    text="Lưu"
                />
                <Controls.Button
                    text="Hủy"
                    color="default"
                    onClick={resetForm}
                />
            </div>
        </Form>
    );
}
