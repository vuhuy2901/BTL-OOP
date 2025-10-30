const  db = require("../config/db.js")


const KhachHang = {

  getAll: (callback) => {
    const sql = 'SELECT * FROM KHACH_HANG';
    db.query(sql, callback);
  },


  getById: (ma_kh, callback) => {
    const sql = 'SELECT * FROM KHACH_HANG WHERE ma_kh = ?';
    db.query(sql, [ma_kh], callback);
  },

  
  getByUsername: (ten_dang_nhap, callback) => {
    const sql = 'SELECT * FROM KHACH_HANG WHERE ten_dang_nhap = ?';
    db.query(sql, [ten_dang_nhap], callback);
  },
  getByEmail: (email, callback) => {
    const sql = "SELECT * FROM khach_hang WHERE email = ?";
    db.query(sql, [email], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO KHACH_HANG 
      (ten_dang_nhap, ho_ten, email, mat_khau, so_dien_thoai, dia_chi, ngay_sinh, gioi_tinh, ngay_dang_ky)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    const params = [
      data.ten_dang_nhap,
      data.ho_ten,
      data.email,
      data.mat_khau,
      data.so_dien_thoai,
      data.dia_chi,
      data.ngay_sinh,
      data.gioi_tinh
    ];
    db.query(sql, params, callback);
  },

 
  update: (ma_kh, data, callback) => {
    const sql = `
      UPDATE KHACH_HANG
      SET ho_ten=?, email=?, so_dien_thoai=?, dia_chi=?, ngay_sinh=?, gioi_tinh=?
      WHERE ma_kh=?
    `;
    const params = [
      data.ho_ten,
      data.email,
      data.so_dien_thoai,
      data.dia_chi,
      data.ngay_sinh,
      data.gioi_tinh,
      ma_kh
    ];
    db.query(sql, params, callback);
  },


  delete: (ma_kh, callback) => {
    const sql = 'DELETE FROM KHACH_HANG WHERE ma_kh = ?';
    db.query(sql, [ma_kh], callback);
  }
};

module.exports = KhachHang;
