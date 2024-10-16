import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// DanhSachHoaDon component
const DanhSachHoaDon = () => {
    const navigate = useNavigate();

    const [xemdatkhams, setxemdatkhams] = useState([
        {
            MaBA: "1",
            TenBN: "nguyen van A",
            NgayKham: "12-2-2024",
            TrangThai: "false",
        },
        {
            MaBA: "12",
            TenBN: "lanh",
            NgayKham: "29-02-2020",
            TrangThai: "true",
        },
    ]);
    const [sortOption, setSortOption] = useState("Ngày khám gần nhất");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleSortChange = (option) => {
        setSortOption(option);
        setDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const filteredPatients = xemdatkhams
        .sort((a, b) => {
            if (sortOption === "Ngày khám gần nhất") {
                return new Date(b.NgayKham) - new Date(a.NgayKham);
            } else {
                return new Date(a.NgayKham) - new Date(b.NgayKham);
            }
        });


    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.homePage}>
            <div style={styles.content}>
                <div style={styles.mainContent}>
                    <div style={styles.pageContainer}>
                        <div style={styles.pageHeader}>
                            <div style={styles.pageTitleLeft}>DANH SÁCH HOÁ ĐƠN</div>
                            <div style={styles.pageTitleRight}>
                                Danh sách hoá đơn / Danh sách hoá đơn
                            </div>
                        </div>
                        <div style={styles.whiteContainer}>
                            <div style={styles.searchSection}>
                                <div style={styles.searchSection}>
                                    <label style={styles.sortLabel}>Sắp xếp theo:</label>
                                    <div className="patient-filter-button">
                                        {sortOption}
                                        <div className="dropdown-time">
                                            <img
                                                className={`doctor-arrow ${dropdownOpen ? "open" : ""}`}
                                                src="Polygon 1.png"
                                                alt="Doctor"
                                                onClick={toggleDropdown}
                                            />
                                            {dropdownOpen && (
                                                <div className="dropdown-menuTime show">
                                                    <button
                                                        className="dropdown-itemTime"
                                                        onClick={() => handleSortChange("Ngày khám gần nhất")}
                                                    >
                                                        Ngày khám gần nhất
                                                    </button>
                                                    <button
                                                        className="dropdown-itemTime"
                                                        onClick={() => handleSortChange("Ngày khám xa nhất")}
                                                    >
                                                        Ngày khám xa nhất
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button style={styles.searchButton}>TRA CỨU</button>
                                </div>
                            </div>
                            <table style={styles.table}>
                                <thead>
                                    <tr>
                                        <th style={styles.th}>STT</th>
                                        <th style={styles.th}>Mã BA</th>
                                        <th style={styles.th}>Tên bệnh nhân</th>
                                        <th style={styles.th}>Ngày khám</th>
                                        <th style={styles.th}>Tình trạng</th>
                                        <th style={styles.th}>Chi tiết</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((xemdatkham, index) => (
                                        <tr key={index}>
                                            <td style={styles.td}>{index + 1}</td>
                                            <td style={styles.td}>{xemdatkham.MaBA}</td>
                                            <td style={styles.td}>{xemdatkham.TenBN}</td>
                                            <td style={styles.td}>{xemdatkham.NgayKham}</td>
                                            <td style={styles.td}>
                                                {xemdatkham.TrangThai === "true" ? (
                                                    <a
                                                        style={{
                                                            color: "green",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Đã thanh toán
                                                    </a>
                                                ) : (
                                                    <a
                                                        style={{
                                                            color: "red",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Chưa thanh toán
                                                    </a>
                                                )}
                                            </td>
                                            <td style={styles.td}>
                                                <button
                                                    style={styles.actionButton}
                                                    onClick={() => navigateTo("/chitietbenhan")}
                                                >
                                                    Xem
                                                </button>{" "}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const styles = {
    homePage: {
        width: "100%",
        height: "100%",
        background: "#E4F5FF",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        flex: 1,
    },
    sortSelect: {
        padding: '5px 10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
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
    searchSection: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        justifyContent: 'space-between',  // Đẩy các phần tử ra hai phía
    },
    searchInput: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginRight: "10px",
        flex: "1",
    },
    searchButton: {
        padding: "10px 20px",
        backgroundColor: "#22668E",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginRight: "10px",
        cursor: 'pointer',  // Thay đổi con trỏ chuột khi hover
    },
    sortLabel: {
        marginRight: '10px',  // Khoảng cách giữa chữ "Sắp xếp theo:" và ô chọn
    },
    sortSelect: {
        padding: '10px',  // Khoảng đệm bên trong ô chọn
        border: '1px solid #000',  // Viền màu đen
        borderRadius: '5px',  // Bo tròn các góc
        marginRight: '20px',  // Khoảng cách giữa ô chọn và nút Tra cứu
    },
    addButton: {
        padding: "10px 20px",
        backgroundColor: "#22668E",
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    whiteContainer: {
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        height: "100%",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    th: {
        backgroundColor: "#22668E",
        color: "#ffffff",
        padding: "10px",
        textAlign: "left",
    },
    td: {
        padding: "10px",
        borderBottom: "1px solid #ddd",
    },
    actionButton: {
        backgroundColor: "transparent",
        border: "none",
        color: "#22668E",
        cursor: "pointer",
    },
};

export default DanhSachHoaDon;
