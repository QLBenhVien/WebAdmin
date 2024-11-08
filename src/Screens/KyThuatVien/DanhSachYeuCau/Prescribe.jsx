import React, { useState } from "react";
import "../Doctor.css";
import { useNavigate } from "react-router-dom";

const Prescribe = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = [];
    for (let i = 0; i < files.length && selectedImage.length + newImages.length < 3; i++) {
      const imageUrl = URL.createObjectURL(files[i]);
      newImages.push(imageUrl);
    }
    setSelectedImage((prevImages) => [...prevImages, ...newImages].slice(0, 3));
  };

  const handleRemoveImage = (index) => {
    setSelectedImage((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const confirmSave = window.confirm("Bạn có muốn lưu lại những thay đổi không?");
    
    if (confirmSave) {
      console.log("Data saved:");
      alert("Dữ liệu đã được lưu thành công!");
      navigate("/KyThuatVien/requestList");
    }
  };

  return (
    <div className="outer">
      <div className="patient-header">
        <div className="patient-header-title">PHIẾU XÉT NGHIỆM</div>
        <div className="patient-header-breadcrumb">
          <span>
            <strong><a className="link-xem" href="/KyThuatVien/prescribe">Danh sách yêu cầu </a> / </strong>
          </span>
          <span className="patient-breadcrumb-secondary">Phiếu xét nghiệm</span>
        </div>
      </div>

      <div className="container3">
        <div style={styles.InfoContainer}>
          <div style={styles.infoSection}>
            <h2 style={styles.sectionTitle}>Thông tin bệnh nhân</h2>
            <p><strong>Mã bệnh nhân:</strong> 0000000</p>
            <p><strong>Họ và tên:</strong> Nguyễn Thanh Đa</p>
            <p><strong>Ngày sinh:</strong> 20/10/2004</p>
            <p><strong>Địa chỉ:</strong> HCM</p>
            <p><strong>Giới tính:</strong> Nam</p>
            <p><strong>SDT:</strong> 0987967497</p>
          </div>
        </div>
      </div>

      <div className="container3">
        <div style={styles.formGroup}>
          <div style={styles.label}>Chuẩn đoán</div>
          <div style={styles.inputContainer}>
            <input type="text" style={styles.inputField} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.label}>Tải hình ảnh (Tối đa 3 ảnh)</div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            style={styles.inputField1}
            disabled={selectedImage.length >= 3}
          />
          <div style={styles.fixedImageContainer}>
            {[0, 1, 2].map((index) => (
              <div key={index} style={styles.imageFrame}>
                {selectedImage[index] ? (
                  <>
                    <img
                      src={selectedImage[index]}
                      alt={`Uploaded Preview ${index + 1}`}
                      style={styles.imagePreview}
                    />
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <div style={styles.placeholder}>Ảnh {index + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="patient-list-search-filter2">
        <div onClick={handleSave} className="patient-search-buttonn">Lưu</div>
        <div onClick={() => navigate(-1)} className="patient-search-buttonn">
            Quay lại
          </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  InfoContainer: {
    backgroundColor: "#ffffff",
    padding: "5px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  infoSection: {
    margin: "30px",
  },
  sectionTitle: {
    padding: "10px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginLeft: "30px",
    paddingTop: "10px",
  },
  label: {
    marginBottom: "5px",
    color: "black",
    fontSize: 18,
    fontFamily: "Roboto",
    fontWeight: "700",
    lineHeight: "30px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    background: "white",
    borderRadius: 7,
    border: "1px solid black",
    padding: "4px 13px",
    width: 723,
    height: 30,
    marginBottom: "20px",
  },
  inputField1: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "Roboto",
    marginBottom: "10px",
  },
  inputField: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "Roboto",
  },
  fixedImageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    marginBottom: '20px'
  },
  imageFrame: {
    position: 'relative',
    width: '100px',
    height: '100px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '2px 5px',
    fontSize: '12px',
  },
  placeholder: {
    fontSize: '14px',
    color: '#888',
  },
};

export default Prescribe;
