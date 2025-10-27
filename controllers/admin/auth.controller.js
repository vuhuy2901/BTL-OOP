

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {

    req.session.adminId = "admin";
    req.session.adminUsername = username;
    
    return res.json({ success: true, message: "Đăng nhập thành công" });
  }

  return res.status(401).json({ success: false, message: "Sai tên hoặc mật khẩu" });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Lỗi khi đăng xuất:", err);
    }
    res.redirect('/admin/login');
  });
};