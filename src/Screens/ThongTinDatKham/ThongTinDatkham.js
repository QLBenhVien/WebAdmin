import React from 'react';
import logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.sidebarHeader}>
                <img src={logo} alt="Logo" style={styles.logo} />
                <span style={styles.sidebarTitle}>Phòng khám UCM</span>
            </div>
            <ul style={styles.sidebarList}>
                <li style={styles.sidebarItem} onClick={() => navigateTo('/letan-home')}>Trang chủ</li>
                <li style={{ ...styles.sidebarItem, backgroundColor: '#FFFFFF', color: '#000000' }} onClick={() => navigateTo('/quanlydatkham')}>Quản lý đặt khám</li>
                <li style={styles.sidebarItem} onClick={() => navigateTo('/lapphieukhambenh')}>Lập phiếu khám bệnh</li>
            </ul>
        </div>
    );
};

const ThongTinDatKham = () => {
    return (
        <div style={styles.homePage}>
            <div style={styles.content}>
                <Sidebar />
                <div style={styles.mainContent}>
                    <div style={styles.navbar}>
                        <div style={styles.userInfo}>
                            <div style={styles.userAvatar}></div>
                            <div style={styles.userName}>
                                BS. Nguyễn Văn A
                            </div>
                        </div>
                    </div>
                    <div style={styles.pageContainer}>
                        <div style={styles.pageHeader}>
                            <div style={styles.pageTitleLeft}>
                                THÔNG TIN ĐẶT KHÁM
                            </div>
                            <div style={styles.pageTitleRight}>
                                Quản lý đặt khám / Xem lịch đặt khám
                            </div>
                        </div>
                        <div style={styles.InfoContainer}>
                            <div style={styles.infoSection}>
                                <h2 style={styles.sectionTitle}>Thông tin bệnh nhân</h2>
                                <p><strong>Mã bệnh nhân:</strong> BN01</p>
                                <p><strong>Họ và Tên:</strong> Nguyễn Thị Kim Liên</p>
                                <p><strong>Tuổi:</strong>24</p>
                                <p><strong>Địa chỉ:</strong> Nguyễn Thái Sơn, Phường 5, Gò Vấp</p>
                                <p><strong>SDT:</strong> 0987967497</p>
                                <p><strong>Giới tính:</strong>Nữ</p>
                                <p><strong>Tên bác sĩ:</strong> Nguyễn Văn A</p>
                                <p><strong>Ngày hẹn:</strong> 19/09/2024</p>
                                <p><strong>Ca hẹn:</strong> ca 2</p>
                                <p><strong>Triệu chứng:</strong> sốt cao</p>
                            </div>
                        </div>
                        <button style={styles.backButton}>Trở lại</button>
                        <button style={styles.duyetButton}> Duyệt</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const styles = {
    homePage: {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#E4F5FF',
        display: 'flex',
        flexDirection: 'column',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DDD',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
    },
    userAvatar: {
        width: '60px',
        height: '60px',
        background: '#D9D9D9',
        borderRadius: '50%',
        marginRight: '20px',
    },
    userName: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    content: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        width: '300px',
        backgroundColor: '#22668E',
        padding: '20px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
    },
    logo: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
    },
    sidebarTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#22668E',
    },
    sidebarList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
    },
    sidebarItem: {
        marginBottom: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#578EAF',
        borderRadius: '10px',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        position: 'relative',
    },
    pageContainer: {
        background: 'rgba(228, 245, 255, 1)',
        padding: '20px',
        borderRadius: '0 20px 20px 0',
        height: '100%',
    },
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        marginBottom: '20px',
    },
    pageTitleLeft: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#000000',
    },
    pageTitleRight: {
        fontSize: '20px',
        fontWeight: '400',
        color: '#000000',
    },
    whiteContainer: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        height: '100%',
    },
    InfoContainer: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    },
    infoSection: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    backButton: {
        padding: '10px 20px',
        backgroundColor: '#22668E',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
        fontWeight: 'bold',
        fontSize: '16px',     
    },
    duyetButton: {
        padding: '10px 20px',
        backgroundColor: '#22668E',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',   
        fontSize: '16px',     
    },
};
export default ThongTinDatKham;