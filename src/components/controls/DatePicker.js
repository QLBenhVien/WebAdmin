import React from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

export default function CustomDatePicker(props) {
    const { name, label, value, onChange } = props;

    // Chuyển đổi giá trị từ chuỗi sang đối tượng Date nếu cần
    const parsedValue = value instanceof Date ? value : new Date(value);

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}>
            <DatePicker
                label={label}
                value={parsedValue}
                // onChange={(newValue) => onChange(convertToDefEventPara(name, newValue))}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                inputFormat="dd/MM/yyyy"
            />
        </LocalizationProvider>
    );
}
