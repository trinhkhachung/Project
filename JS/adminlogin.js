document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Kiểm tra username và password
    if (username === "admin" && password === "admin123") {
      // Nếu thông tin đúng, lưu thông tin đăng nhập vào Local Storage
      localStorage.setItem("loggedIn", "true");
      window.location.href = "admin.html"; // Chuyển hướng đến trang admin
    } else {
      // Nếu thông tin không đúng, hiển thị thông báo lỗi
      alert("Invalid username or password. Please try again.");
    }
  });
