import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DoctorPage from './Screens/TrangBacSi/DoctorPage';
import MedicalRecords from './Screens/QuanLyHoSoBenhAn/MedicalRecords';
import Prescription from './Screens/PhieuChiDinh/Prescription';
import PatientInfo from './Screens/ThongTinHoSoBenhAn/PatientInfo';
import Login from './Screens/Dangnhap/Login';
import LetanPage from './Screens/TrangLeTan/LetanPage'; 
import QuanLyDatKham from './Screens/QuanLyDatKham/QuanLyDatKham';
import ThongTinDatKham from './Screens/ThongTinDatKham/ThongTinDatkham';
import LapPhieuKhamBenh from './Screens/LapPhieuKhamBenh/LapPhieuKhamBenh';
import Sidebar from './Screens/TrangBacSi/SideBar';
import PatientList from './Screens/TrangBacSi/PatientList';
import SearchPatient from './Screens/TrangBacSi/SearchPatient';
import MedicalRecordsDetails2 from './Screens/TrangBacSi/MedicalRecordsDetail2';
import MedicalRecordsDetails from './Screens/TrangBacSi/MedicalRecordsDetail';
import InfoMedicalRecords from './Screens/TrangBacSi/InfoMedicalRecords';
import Header from './Screens/TrangBacSi/Header';
import ExaminationForm from './Screens/TrangBacSi/ExaminationForm';
import Referrals from './Screens/TrangBacSi/Referrals';
import MedicalRecord from './Screens/TrangBacSi/MedicalRecord';
import ResultTesting from './Screens/TrangBacSi/ResultTesting';
import Prescribe from './Screens/TrangBacSi/Prescribe';

const SidebarWrapper = () => {
    const location = useLocation(); 

    // Danh sách các đường dẫn mà bạn muốn hiển thị Sidebar và Header
    const pathsWithSidebarAndHeader = [
        '/medicalRecord',
        '/home',
        '/patientList',
        '/searchPatient',
        '/medicalRecordsDetail',
        '/medicalRecordsDetail2',
        '/infoMedicalRecordsDetail',
        '/referrals',
        '/examinationForm',
        '/resultTesting',
        '/prescribe'
    ];

    // Kiểm tra nếu đường dẫn hiện tại có trong danh sách trên
    const showSidebarAndHeader = pathsWithSidebarAndHeader.includes(location.pathname);

    return (
        <>
            {showSidebarAndHeader && <Sidebar />}
            {showSidebarAndHeader && <Header />}
        </>
    );
};

const App = () => {
    return (
        <Router>
            <SidebarWrapper /> 
            <Routes>
                <Route path="/prescribe" element={<Prescribe />} />
                <Route path="/resultTesting" element={<ResultTesting />} />
                <Route path="/lapphieukhambenh" element={<LapPhieuKhamBenh />} />
                <Route path="/thongtindatkham" element={<ThongTinDatKham />} />
                <Route path="/quanlydatkham" element={<QuanLyDatKham />} />
                <Route path="/letan-home" element={<LetanPage />} />
                <Route path="/medical-records" element={<MedicalRecords />} />
                <Route path="/prescription" element={<Prescription />} />
                <Route path="/home" element={<DoctorPage />} />
                <Route path="/patient-info" element={<PatientInfo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/patientList" element={<PatientList />} />
                <Route path="/searchPatient" element={<SearchPatient />} />
                <Route path="/medicalRecordsDetail" element={<MedicalRecordsDetails />} />
                <Route path="/medicalRecordsDetail2" element={<MedicalRecordsDetails2 />} />
                <Route path="/infoMedicalRecordsDetail" element={<InfoMedicalRecords />} />
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/examinationForm" element={<ExaminationForm />} />
                <Route path="/medicalRecord" element={<MedicalRecord />} />
            </Routes>
        </Router>
    );
};

export default App;
