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
import Schedule from "./Schedule";
// import Login from "../Login/Login";
const DoctorRoles = () => {
  return (
    <div
      style={{
        display: "flex",
        maxHeight: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ flexBasis: "20%" }}>
        <NavBacSi />
      </div>

      <div style={{ flexBasis: "80%" }}>
        <Header />
        <Routes>
          <Route
            path="/examinationForm/prescribe/:id"
            element={<Prescribe />}
          />
          <Route path="/resultTesting" element={<ResultTesting />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/home" element={<DoctorPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medicalRecord/patient-info" element={<PatientInfo />} />
          <Route path="/patientList" element={<PatientList />} />
          <Route path="/searchPatient" element={<SearchPatient />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route
            path="/medicalRecordsDetail"
            element={<MedicalRecordsDetails />}
          />
          <Route
            path="/medicalRecordsDetail2"
            element={<MedicalRecordsDetails2 />}
          />
          <Route
            path="infoMedicalRecordsDetail"
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

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #DDD",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  userAvatar: {
    width: "60px",
    height: "60px",
    background: "#D9D9D9",
    borderRadius: "50%",
    marginRight: "20px",
  },
  userName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default DoctorRoles;
