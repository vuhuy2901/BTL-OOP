
const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'shop_the_thao',
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


module.exports = connection;
