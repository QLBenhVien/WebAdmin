import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorPage from './Screens/TrangBacSi/DoctorPage';
import MedicalRecords from './Screens/QuanLyHoSoBenhAn/MedicalRecords';
import Prescription from './Screens/PhieuChiDinh/Prescription';
import PatientInfo from './Screens/ThongTinHoSoBenhAn/PatientInfo';
import Login from './Screens/Dangnhap/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/medical-records" element={<MedicalRecords />} />
                <Route path="/prescription" element={<Prescription />} />
                <Route path="/home" element={<DoctorPage />} />
                <Route path="/patient-info" element={<PatientInfo />} />
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </Router>
    );
};

export default App;
