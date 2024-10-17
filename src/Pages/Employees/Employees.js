import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import PageHeader from '../../components/PageHeader';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { makeStyles } from '@mui/styles';
import { Paper, TableBody, TableCell, TableRow, Toolbar, InputAdornment } from '@mui/material';
import useTable from '../../components/useTable';
import * as employeeService from "../../services/employeeService";
import { EditOutlined, Search, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import Popup from '../../components/controls/Popup';
import Notification from '../../components/controls/Notification';
import Controls from '../../components/controls/Control';
import EmployeeDetails from './EmployeeDetails'; // Nhập component EmployeeDetails
import { reactivateEmployee } from '../../services/employeeService';

const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    newButton: {
        marginLeft: theme.spacing(4),
    },
    searchInput: {
        width: '80%',
        marginRight: '30px'
    },
    actionButton: {
        margin: '0 5px',
    },
}));

const headCells = [
    { id: 'fullName', label: "Tên nhân viên" },
    { id: 'email', label: "Email" },
    { id: 'mobile', label: "Số điện thoại" },
    { id: 'department', label: "Chức vụ" },
    { id: 'condition', label: "Trạng thái" },
    { id: 'actions', label: 'Hành động', disableSorting: true },
];

export const getCondition = () => ([
    { id: '1', title: 'Đang hoạt động' },
    { id: '2', title: 'Đã vô hiệu hóa' },
]);

export default function Employees() {
    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [openDetailsPopup, setOpenDetailsPopup] = useState(false); // Popup cho thông tin chi tiết
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value.toLowerCase()));
            },
        });
    };

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0) {
            employeeService.insertEmployee(employee);
        } else {
            employeeService.updateEmployee(employee);
        }

        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Lưu thành công',
            type: 'success'
        });
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    const toggleAccountStatus = (employee) => {
        if (employee.condition === 1) {
            if (window.confirm('Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?')) {
                const result = employeeService.disableEmployee(employee.id); // Vô hiệu hóa
                if (result) {
                    setRecords(employeeService.getAllEmployees());
                    setNotify({
                        isOpen: true,
                        message: 'Vô hiệu hóa thành công',
                        type: 'error'
                    });
                }
            }
        } else if (employee.condition === 2) {
            if (window.confirm('Bạn có chắc chắn muốn kích hoạt lại tài khoản này không?')) {
                const result = reactivateEmployee(employee.id); // Kích hoạt lại
                if (result) {
                    setRecords(employeeService.getAllEmployees());
                    setNotify({
                        isOpen: true,
                        message: 'Kích hoạt tài khoản thành công',
                        type: 'success'
                    });
                }
            }
        }
    };
    
    const handleVisibilityClick = (item) => {
        setSelectedEmployee(item);
        setOpenDetailsPopup(true);
    };

    return (
        <>
            <PageHeader
                title="Quản lý Nhân viên"
                subTitle="Form design with validation"
                icon={<PeopleAltIcon fontSize="large" />}
            />

            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Tìm kiếm nhân viên"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Thêm nhân viên"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>
                                        <span style={{
                                            color: item.condition === 1 ? '#22668E' : 'red',
                                            fontWeight: 'bold'
                                        }}>
                                            {item.condition === 1 ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <Controls.ActionButton
                                            color='primary'
                                            className={classes.actionButton}
                                            onClick={() => { openInPopup(item); }}
                                        >
                                            <EditOutlined fontSize='small' />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color='secondary'
                                            className={classes.actionButton}
                                            onClick={() => { handleVisibilityClick(item); }}
                                        >
                                            <Visibility fontSize='small' />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

            <Popup
                title="CHỈNH SỬA THÔNG TIN NHÂN VIÊN"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>

            {/* Popup cho thông tin chi tiết nhân viên */}
            <Popup
                title="THÔNG TIN NHÂN VIÊN"
                openPopup={openDetailsPopup}
                setOpenPopup={setOpenDetailsPopup}
            >
                {selectedEmployee && (
                    <EmployeeDetails employee={selectedEmployee} />
                )}
                <Controls.Button
                    text={selectedEmployee?.condition === 1 ? "Vô hiệu hóa tài Khoản" : "Kích hoạt lại tài Khoản"}
                    color={selectedEmployee?.condition === 1 ? "secondary" : "primary"}
                    style={{ float: 'right' }}
                    onClick={() => { 
                        toggleAccountStatus(selectedEmployee); 
                        setOpenDetailsPopup(false); 
                        setSelectedEmployee(null); 
                    }} 
                />
            </Popup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}