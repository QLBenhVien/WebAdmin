import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorPage from './Screens/TrangBacSi/DoctorPage';
import MedicalRecords from './Screens/QuanLyHoSoBenhAn/MedicalRecords';
import Prescription from './Screens/PhieuChiDinh/Prescription';
import PatientInfo from './Screens/ThongTinHoSoBenhAn/PatientInfo';
import Login from './Screens/Dangnhap/Login';
import LetanPage from './Screens/TrangLeTan/LetanPage'; 
import QuanLyDatKham from './Screens/QuanLyDatKham/QuanLyDatKham';
import ThongTinDatKham from './Screens/ThongTinDatKham/ThongTinDatkham';
import LapPhieuKhamBenh from './Screens/LapPhieuKhamBenh/LapPhieuKhamBenh';
import QuanTri from './Screens/QuanTri/QuanTri';
import QuanTriBN from './Screens/QuanTri/QuanTriBN';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/lapphieukhambenh" element={<LapPhieuKhamBenh/>} />
                <Route path="/thongtindatkham" element={<ThongTinDatKham/>} />
                <Route path="/quanlydatkham" element={<QuanLyDatKham/>} />
                <Route path="/letan-home" element={<LetanPage/>} />
                <Route path="/medical-records" element={<MedicalRecords />} />
                <Route path="/prescription" element={<Prescription />} />
                <Route path="/home" element={<DoctorPage />} />
                <Route path="/patient-info" element={<PatientInfo />} />
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/quantri" element={<QuanTri />} />
                <Route path="/quantriBN" element={<QuanTriBN />} />

            </Routes>
        </Router>
    );
};

export default App;



