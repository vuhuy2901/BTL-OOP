
console.log("✅ File auth.js đã được load!");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const username = form.username.value.trim(); 
    const password = form.password.value.trim(); 

    
    if (!username || !password) {
      message.textContent = "Vui lòng nhập tên đăng nhập và mật khẩu!";
      message.style.color = "red";
      return;
    }

    try {
     
      message.textContent = "Đang xử lý...";
      message.style.color = "blue";
    
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
  
        message.textContent = "Đăng nhập thành công!";
        message.style.color = "green";
        
        if (data.token) {
          window.authToken = data.token;
        }
          if (data.user) {
        sessionStorage.setItem('username', data.user.username);
        sessionStorage.setItem('ho_ten', data.user.ho_ten);
        }
        
  
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
       
        message.textContent = data.message || "Sai tên đăng nhập hoặc mật khẩu!";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Lỗi:", error);
      message.textContent = "Có lỗi xảy ra. Vui lòng thử lại!";
      message.style.color = "red";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const hoTen = form.name.value.trim();
    const email = form.email.value.trim();
    const soDienThoai = form.phone.value.trim();
    const diaChi = form.address.value.trim() ;
    const ngaySinh = form.birthday.value ;
    

    const gioiTinhRadio = form.querySelector('input[name="gender"]:checked');
    const gioiTinh = gioiTinhRadio ? gioiTinhRadio.value : null;
   

    if (!username || !password || !hoTen || !email || !soDienThoai || !diaChi || !ngaySinh) {
      message.textContent = "Vui lòng nhập đầy đủ thông tin bắt buộc!";
      message.style.color = "red";
      return;
    }

 
    if (confirmPassword && password !== confirmPassword) {
      message.textContent = "Mật khẩu không khớp!";
      message.style.color = "red";
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Email không hợp lệ!";
      message.style.color = "red";
      return;
    }

    try {
      message.textContent = "Đang xử lý...";
      message.style.color = "blue";


      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username ,
          password: password,
          ho_ten: hoTen,
          email:email,
          so_dien_thoai: soDienThoai,
          dia_chi: diaChi,
          ngay_sinh: ngaySinh,
          gioi_tinh: gioiTinh
        })
      });

      const data = await response.json();

      if (response.ok) {
        message.textContent = "Đăng ký thành công! Đang chuyển đến trang đăng nhập...";
        message.style.color = "green";
        
      
        form.reset();
        
        
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        message.textContent = data.message || "Đăng ký thất bại!";
        message.style.color = "red";
      }
    } catch (error) {
      console.error("Lỗi:", error);
      message.textContent = "Có lỗi xảy ra. Vui lòng thử lại!";
      message.style.color = "red";
    }
  });
});




  