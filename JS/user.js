window.onload = function () {
  displayUsers();
};

function displayUsers() {
  const usersList = document.getElementById("usersList");
  usersList.innerHTML = "";

  // Lấy danh sách người dùng từ Local Storage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${user.userId}</td>
        <td>${user.userName}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.address}</td>
        <td>
          
          <button onclick="${user.action === 0 ? 'unblockUser' : 'blockUser'}(${index})" class="btFc">${user.action === 0 ? "Bỏ chặn" : "Chặn"}</button>
        </td>
      `;
    usersList.appendChild(row);
  });
}
//<button onclick="edituser(${user.userId})">Edit</button>
//<button onclick="deleteuser(${user.userId})">Delete</button>

function edituser(userId) {
  // Tìm người dùng theo userId
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userToEdit = users.find((user) => user.userId === userId);

  if (userToEdit) {
    const newUserName = prompt("Nhập tên mới:", userToEdit.userName);
    const newEmail = prompt("Nhập email mới:", userToEdit.email);
    const newPassword = prompt("Nhập mật khẩu mới:", userToEdit.password);
    const newAddress = prompt("Nhập địa chỉ mới:", userToEdit.address);

    // Cập nhật thông tin người dùng
    userToEdit.userName = newUserName;
    userToEdit.email = newEmail;
    userToEdit.password = newPassword;
    userToEdit.address = newAddress;

    // Cập nhật dữ liệu trong Local Storage
    localStorage.setItem("users", JSON.stringify(users));

    // Refresh bảng
    displayUsers();
  } else {
    alert("Không tìm thấy người dùng!");
  }
}

function deleteuser(userId) {
  // Tìm người dùng theo userId
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((user) => user.userId === userId);

  if (userIndex !== -1) {
    // Xóa người dùng khỏi mảng
    users.splice(userIndex, 1);

    // Cập nhật dữ liệu trong Local Storage
    localStorage.setItem("users", JSON.stringify(users));

    // Refresh bảng
    displayUsers();
  } else {
    alert("Không tìm thấy người dùng!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Thêm hành động mặc định (Dashboard) khi trang tải

  // Thêm lắng nghe sự kiện vào các liên kết thanh điều hướng
  document.getElementById("dashboardLink").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "index.html";
  });
  document.getElementById("productsLink").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "product.html";
  });
  document.getElementById("ordersLink").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "user.html";
  });
  document.getElementById("logoutBtn").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "adminlogin.html";
  });
});

function blockUser(index) {
  const usersLocal = JSON.parse(localStorage.getItem('users')) || [];
  // Chuyển trạng thái action của người dùng về 0 (chặn)
  usersLocal[index].action = 0;
  // Cập nhật dữ liệu trong local storage
  localStorage.setItem('users', JSON.stringify(usersLocal));
  // Render lại bảng người dùng
  displayUsers();
}

function unblockUser(index) {
  const usersLocal = JSON.parse(localStorage.getItem('users')) || [];
  // Chuyển trạng thái action của người dùng về 1 (không bị chặn)
  usersLocal[index].action = 1;
  // Cập nhật dữ liệu trong local storage
  localStorage.setItem('users', JSON.stringify(usersLocal));
  // Render lại bảng người dùng
  displayUsers();
}