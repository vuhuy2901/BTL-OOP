// db.js
const mysql = require('mysql2');

// Tạo kết nối
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'testdb',
  port: 3306
});

// Kết nối MySQL
connection.connect((err) => {
  if (err) {
    console.error('❌ Lỗi kết nối MySQL:', err.message);
  } else {
    console.log('✅ Đã kết nối MySQL thành công!');
  }
});

// Xuất kết nối để dùng ở file khác
module.exports = connection;
