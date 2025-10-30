const KhachHang = require("../../models/KhachHang");

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin"
    });
  }

  KhachHang.getByUsername(username, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Lỗi server"
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu"
      });
    }

    const user = results[0];
    if (password === user.mat_khau) {
      req.session.isLoggedIn = true;
      req.session.ma_kh = user.ma_kh;
      req.session.username = user.ten_dang_nhap;
      req.session.ho_ten = user.ho_ten;

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        user: {
          ma_kh: user.ma_kh,
          username: user.ten_dang_nhap,
          ho_ten: user.ho_ten
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu"
      });
    }
  });
};







exports.register = (req, res) => {
  const { 
    username, 
    password, 
    ho_ten, 
    email, 
    so_dien_thoai, 
    dia_chi, 
    ngay_sinh, 
    gioi_tinh 
  } = req.body;

  console.log("📩 Dữ liệu nhận được:", req.body);
  
  if (!username || !password || !ho_ten || !email) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ thông tin bắt buộc!"
    });
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Email không hợp lệ!"
    });
  }

  KhachHang.getByUsername(username, (err, userResults) => {
    if (err) {
      console.error("❌ Lỗi database khi kiểm tra username:", err);
      return res.status(500).json({
        success: false,
        message: "Lỗi server!"
      });
    }

    if (userResults.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập đã tồn tại!"
      });
    }

 
    KhachHang.getByEmail(email, (err, emailResults) => {
      if (err) {
        console.error("❌ Lỗi database khi kiểm tra email:", err);
        return res.status(500).json({
          success: false,
          message: "Lỗi server!"
        });
      }

      if (emailResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Email này đã được đăng ký!"
        });
      }

      const userData = {
        ten_dang_nhap: username,
        mat_khau: password,
        ho_ten: ho_ten,
        email: email,
        so_dien_thoai: so_dien_thoai|| null,
        dia_chi: dia_chi || null,
        ngay_sinh: ngay_sinh || null,
        gioi_tinh: gioi_tinh || null
      };

      KhachHang.create(userData, (err, result) => {
        if (err) {
          console.error("❌ Lỗi khi tạo tài khoản:", err);
          return res.status(500).json({
            success: false,
            message: "Lỗi khi tạo tài khoản!"
          });
        }

        return res.status(201).json({
          success: true,
          message: "Đăng ký thành công!"
        });
      });
    });
  });
};
