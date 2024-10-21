import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import DoctorPage from "./DoctorPage";
import MedicalRecords from "./QuanLyHoSoBenhAn/MedicalRecords";
import Prescription from "./PhieuChiDinh/Prescription";
import PatientInfo from "./ThongTinHoSoBenhAn/PatientInfo";
// import LetanPage from "./Screens/TrangLeTan/LetanPage";
// import QuanLyDatKham from "./Screens/QuanLyDatKham/QuanLyDatKham";
// import ThongTinDatKham from "./Screens/ThongTinDatKham/ThongTinDatkham";
// import LapPhieuKhamBenh from "./Screens/LapPhieuKhamBenh/LapPhieuKhamBenh";
import PatientList from "../TrangBacSi/PatientList";
import SearchPatient from "../TrangBacSi/SearchPatient";
import MedicalRecordsDetails2 from "../TrangBacSi/MedicalRecordsDetail2";
import MedicalRecordsDetails from "./MedicalRecordsDetail";
import InfoMedicalRecords from "./InfoMedicalRecords";
import ExaminationForm from "./ExaminationForm";
import Referrals from "../TrangBacSi/Referrals";
import MedicalRecord from "./MedicalRecord";
import ResultTesting from "../TrangBacSi/ResultTesting";
import Prescribe from "../TrangBacSi/Prescribe";
import NavBacSi from "../../components/NavBacSi";
import Header from "./Header";
import Profile from "./Profile";
// import Login from "../Login/Login";
const DoctorRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <NavBacSi />
      </div>

      <div style={{ flex: "8" }}>
        <Header />
        <Routes>
          <Route path="/prescribe" element={<Prescribe />} />
          <Route path="/resultTesting" element={<ResultTesting />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/" element={<DoctorPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/patient-info" element={<PatientInfo />} />
          <Route path="/patientList" element={<PatientList />} />
          <Route path="/searchPatient" element={<SearchPatient />} />
          <Route
            path="/medicalRecordsDetail"
            element={<MedicalRecordsDetails />}
          />
          <Route
            path="/medicalRecordsDetail2"
            element={<MedicalRecordsDetails2 />}
          />
          <Route
            path="/infoMedicalRecordsDetail"
            element={<InfoMedicalRecords />}
          />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/examinationForm" element={<ExaminationForm />} />
          <Route path="/medicalRecord" element={<MedicalRecord />} />
        </Routes>
      </div>
    </div>
  );
};

export default DoctorRoles;
