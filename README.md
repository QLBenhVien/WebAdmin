# Medical Appointment Booking System

## Giới Thiệu

Phần mềm đặt khám bệnh giúp bệnh nhân dễ dàng đặt lịch hẹn với bác sĩ, quản lý hồ sơ bệnh án và nhận thông báo nhắc lịch khám.

## Công Nghệ Sử Dụng

- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Cơ sở dữ liệu**: MongoDB
- **Xác thực**: JSON Web Token (JWT)
- **Thông báo**: Chưa update

## Cài Đặt

### Yêu Cầu Hệ Thống
- Node.js >= 16.x
- MongoDB >= 6.x

### Cách Cài Đặt
1. Clone repository:
   ```bash
   git clone https://github.com/Duypham14063003/bookinghealth_user
   cd bookinghealth_user
   ```
2. Cài đặt các dependencies:
   ```bash
   npm install
   ```
3. Cấu hình môi trường:
   - Tạo file `.env` trong thư mục gốc và thiết lập các biến môi trường cần thiết:
     ```env
     MONGO_URI=mongodb://localhost:27017/medical_booking
     JWT_SECRET=your_secret_key
     PORT=5000
     ```

## Chạy Ứng Dụng

### Chạy Backend
```bash
npm run server
```

### Chạy Frontend
```bash
npm start
```
Mở [http://localhost:3000](http://localhost:3000) để xem giao diện web.

## Tính Năng Chính

- Đặt lịch khám bệnh trực tuyến
- Quản lý hồ sơ bệnh nhân
- Tạo phiếu khám bệnh dưới dạng PDF
- Quét mã QR để xem thông tin lịch hẹn

## Triển Khai
### Build ứng dụng
```bash
npm run build
```
### Deploy lên server
- Dùng Docker:
  ```bash
  docker-compose up -d
  ```
- Deploy lên Vercel hoặc Netlify cho frontend, và Render hoặc Heroku cho backend.

## Hướng Dẫn API

Xem tài liệu API chi tiết tại [Postman Collection](https://documenter.getpostman.com/view/your-api-docs)

## Đóng Góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/new-feature`
3. Commit thay đổi: `git commit -m 'Thêm tính năng mới'`
4. Push lên branch: `git push origin feature/new-feature`
5. Mở pull request

## Giấy Phép
MIT License
