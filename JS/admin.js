// Kiểm tra nếu người dùng đã đăng nhập, nếu chưa, chuyển hướng đến trang đăng nhập
window.onload = function () {
  var loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    window.location.href = "adminlogin.html";
  }

  // Lấy danh sách sản phẩm từ Local Storage
  const storedProducts = localStorage.getItem("products");

  // Kiểm tra nếu có danh sách sản phẩm trong Local Storage
  if (storedProducts) {
    const products = JSON.parse(storedProducts);
    // Hiển thị danh sách sản phẩm trên trang admin
    displayProducts(products);
  } else {
    console.error("No products found in Local Storage.");
  }
};

// Đăng xuất: Xóa thông tin đăng nhập từ Local Storage
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedIn");
  window.location.href = "adminlogin.html"; // Chuyển hướng đến trang đăng nhập
});

document.addEventListener("DOMContentLoaded", function () {
  loadContent("Trang chủ");

  document
    .getElementById("logoutBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "adminlogin.html"
    })
  document
    .getElementById("dashboardLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href("index.html");
    });

  document
    .getElementById("productsLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "product.html";
    });

  document
    .getElementById("ordersLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "user.html";
    });
});

function loadContent(page) {
  var contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<h2>Loading...</h2>";

  // Simulate loading content from server using setTimeout
  setTimeout(function () {
    contentDiv.innerHTML =
      "<h2>" + page.charAt(0).toUpperCase() + page.slice(1) + "</h2>";
  }, 1000); // Change this timeout according to your actual data loading time
}
