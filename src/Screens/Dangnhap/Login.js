import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import doctor from '../../images/doctor.png';
import backgroundImage from '../../images/background_img.png';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/medical-records');
    };

    return (
        <div style={{ ...styles.AppContainer, backgroundImage: `url(${backgroundImage})` }}>
            <div style={styles.LeftContainer}>
                <div style={styles.Header}>
                    <img src={logo} alt="Logo" style={styles.Logo} />
                    <h1 style={styles.Title}>UMC</h1>
                </div>
                <h2 style={styles.WelcomeText}>Vui lòng đăng nhập</h2>
                <div style={styles.LoginBox}>
                    <h2>Đăng Nhập</h2>
                    <input type="text" placeholder="Nhập tên đăng nhập" style={styles.input} />
                    <input type="password" placeholder="Nhập mật khẩu" style={styles.input} />
                    <button onClick={handleLogin} style={styles.button}>Đăng nhập</button>
                    <button style={styles.linkButton}>Quên mật khẩu?</button>
                </div>
            </div>
            <div style={styles.RightContainer}>
                <img src={doctor} alt="Doctor" style={styles.DoctorImage} />
            </div>
        </div>
    );
};

const styles = {
    AppContainer: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    LeftContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    RightContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    Header: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '20px',
        left: '20px',
    },
    Logo: {
        width: '100px',
    },
    Title: {
        fontSize: '34px',
        color: '#333',
        marginLeft: '10px',
        fontWeight: 'bold',
    },
    WelcomeText: {
        fontSize: '34px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    LoginBox: {
        backgroundColor: '#22668f',  // Changed to the desired background color
        color: 'white',  // Ensure the text is visible on the new background
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    input: {
        display: 'block',
        margin: '10px 0',
        padding: '10px',
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
        marginTop: '10px',
    },
    linkButton: {
        background: 'none',
        color: '#007bff',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '14px',
        marginTop: '10px',
    },
    DoctorImage: {
        width: '552px',
        height: '520px',
        marginRight: '270px',
    }
};

export default Login;
