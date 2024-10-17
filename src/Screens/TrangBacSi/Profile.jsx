
import "./Doctor.css";

const Profile = () => {
    const doctorData = [
        {
          maBS: "BS001",
          tenBacSi: "Nguyễn Văn A",
          ngaySinh: "01/01/1999",
          chucVu: "Bác sĩ",
          gioiTinh: "Nam"
        },
      ];
  return (
    <div className="outer2">
      <div className="container4">
      {doctorData.map((doctor) => (
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.headerBg}></div>
            <div style={styles.avatar}></div>
            <div style={styles.headerTitle}>Thông tin cá nhân</div>
          </div>

          <div style={styles.infoRow}>
            <div style={styles.label}>Họ và tên</div>
            <div style={styles.info}>{doctor.tenBacSi}</div>
          </div>
          <div style={{ ...styles.infoRow, top: 276 }}> 
            <div style={styles.label}>Ngày sinh</div>
            <div style={styles.info}>{doctor.ngaySinh}</div> 
          </div>
          <div style={{ ...styles.infoRow, top: 366 }}> 
            <div style={styles.label}>Mã số</div>
            <div style={styles.info}>{doctor.maBS}</div> 
          </div>
          <div style={{ ...styles.infoRow, top: 456 }}> 
            <div style={styles.label}>Chức vụ</div>
            <div style={styles.info}>{doctor.chucVu}</div> 
          </div>
          <div style={{ ...styles.genderRow, top: 206 }}> 
            <div style={styles.label}>Giới tính</div>
            <div style={styles.info}>{doctor.gioiTinh}</div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: 1200,
    height: 773,
    position: 'relative',
    borderRadius: 20,
  },
  header: {
    width: 1200,
    height: 150,
    position: 'absolute',
    borderRadius: 20,
    overflow: 'hidden',
    left: 0,
    top: 0,
  },
  headerBg: {
    width: 1200,
    height: 174,
    position: 'absolute',
    backgroundColor: '#22668E',
    borderRadius: 20,
    left: 0,
    top: 0,
  },
  avatar: {
    width: 125,
    height: 125,
    position: 'absolute',
    backgroundColor: '#D9D9D9',
    left: 100,
    top: 15,
    borderRadius: '50%',
  },
  headerTitle: {
    width: 651,
    height: 137,
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
    fontFamily: 'Roboto',
    fontWeight: '700',
    lineHeight: '75px',
    wordWrap: 'break-word',
    left: 260,
    top: 35,
  },
  infoRow: {
    width: 494,
    height: 60,
    position: 'absolute',
    backgroundColor: '#E6E6E6',
    border: '1px solid black',
    left: 66,
    top: 186,
    marginTop: 20,
  },
  label: {
    width: 131,
    height: 60,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center', 
    textAlign: 'center',
    borderRight: '1px solid black', 
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    lineHeight: '30px',
    wordWrap: 'break-word',
  },
  info: {
    width: 357,
    height: 60,
    position: 'absolute',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 400,
    lineHeight: '30px',
    wordWrap: 'break-word',
    left: 158,
    top: 15,
  },
  genderRow: {
    width: 236,
    height: 60,
    position: 'absolute',
    backgroundColor: '#E6E6E6',
    border: '1px solid black',
    left: 710,
    top: 185,
  },
};

export default Profile;
