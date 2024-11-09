import React from 'react'
import "../Doctor.css"
// InfoCard component
const InfoCard = ({ title, content, icon }) => {
  return (
    <div style={styles.infoCard}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={styles.cardContent}>
        <p>{content}</p>
        <div style={styles.cardIcon}>{icon}</div>
      </div>
    </div>
  );
};

// ProfileCard component
const ProfileCard = ({ profile }) => {
  return (
    <div style={styles.profileCard}>
      <div style={styles.profileHeader}>
        <span style={styles.profileGreeting}>Chào mừng trở lại!</span>
      </div>
      <div style={styles.profileInfo}>
        <div style={styles.profileAvatar}></div>
        <div style={styles.profileDetails}>
          <h3 style={styles.profileName}>{profile.name}</h3>
          <p style={styles.profileRole}>{profile.role}</p>
          <div style={styles.profileDetailsRow}>
            <p>Mã: {profile.id}</p>
            <p>Giới tính: {profile.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule component
const Schedule = ({ schedule }) => {
  return (
    <div style={styles.schedule}>
      <h3 style={styles.scheduleTitle}>Lịch làm việc ngày: {schedule.date}</h3>
      <div style={styles.scheduleTime}>
        <div style={styles.scheduleItem}>{schedule.morning}</div>
        <div style={styles.scheduleItem}>{schedule.afternoon}</div>
      </div>
    </div>
  );
};
const Home = () => {
  const profile = {
    name: "Nguyễn Văn A",
    role: "Kỹ thuật viên",
    gender: "Nam",
    id: "KTV001",
  };

  const schedule = {
    date: "7-7-2024",
    morning: "7:30-11:30",
    afternoon: "13:00-17:00",
  };

  React.useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";
    return () => {
      document.body.style.backgroundColor = "#E4F5FF";
    };
  }, []);

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">TRANG CHỦ</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/KyThuatVien/home">Trang chủ </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Trang chủ </span>
        </div>
      </div>
      <div className="container2">
        <div style={styles.contentRow}>
          <ProfileCard profile={profile} />
          <div style={styles.infoCardsColumn}>
            <InfoCard
              title="Hồ sơ bệnh án"
              content="1"
              icon={<div style={styles.icon}>📋</div>}
            />
            <InfoCard
              title="Phiếu chỉ định"
              content="1"
              icon={<div style={styles.icon}>📄</div>}
            />
          </div>
        </div>
        <Schedule schedule={schedule} />
      </div>
    </div>
  );
}

// Styles
const styles = {
  homePage: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    background: "#E4F5FF",
    display: "flex",
    flexDirection: "column",
  },
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
  content: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#22668E",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#22668E",
  },
  sidebarList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    width: "100%",
  },
  sidebarItem: {
    marginBottom: "20px",
    cursor: "pointer",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "#578EAF",
    borderRadius: "10px",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  pageContainer: {
    background: "rgba(228, 245, 255, 1)",
    padding: "20px",
    borderRadius: "0 20px 20px 0",
    height: "100%",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    marginBottom: "20px",
  },
  pageTitleLeft: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000000",
  },
  pageTitleRight: {
    fontSize: "20px",
    fontWeight: "400",
    color: "#000000",
  },
  contentRow: {
    display: "flex",
    justifyContent: "space-between",
    height: "30%",
    marginBottom: "30px",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "48%",
    marginRight: "2%",
  },
  profileHeader: {
    backgroundColor: "#22668E",
    padding: "10px",
    borderRadius: "10px 10px 0 0",
    color: "#FFFFFF",
  },
  profileGreeting: {
    fontSize: "24px",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },
  profileAvatar: {
    width: "80px",
    height: "80px",
    background: "#D9D9D9",
    borderRadius: "50%",
    marginRight: "20px",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
  },
  profileDetailsRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "200px",
  },
  profileName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  profileRole: {
    fontSize: "14px",
    color: "#000000",
  },
  infoCardsColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "48%",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30%",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
  },
  cardIcon: {
    width: "35px",
    height: "35px",
    backgroundColor: "#22668E",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    marginLeft: "10px",
  },
  schedule: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  scheduleTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  scheduleTime: {
    display: "flex",
  },
  scheduleItem: {
    backgroundColor: "#22668E",
    color: "#FFFFFF",
    padding: "10px 20px",
    borderRadius: "10px",
    marginRight: "20px",
  },
};

export default Home;