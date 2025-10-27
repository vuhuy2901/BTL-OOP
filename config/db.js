const sql = require("mssql");

const config = {
  server: "VUHUY\\TUAN", // tên instance SQL Server của bạn
  database: "SHOP_DO_THE_THAO",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  authentication: {
    type: "ntlm", // bắt buộc phải có
    options: {
      userName: "TUAN", // tài khoản Windows
      password: "", // bỏ trống vì là Windows Auth
      domain: "VUHUY", // tên máy (domain cục bộ)
    },
  },
};

async function testConnection() {
  try {
    console.log("🔄 Đang kết nối đến SQL Server...");
    const pool = await sql.connect(config);
    console.log("✅ Kết nối thành công!");

    const result = await pool.request().query("SELECT name FROM sys.tables");
    console.log("📋 Danh sách bảng trong database:");
    result.recordset.forEach((row) => console.log(" -", row.name));

    await pool.close();
  } catch (err) {
    console.error("❌ Lỗi kết nối:", err);
  }
}

testConnection();
