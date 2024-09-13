// Lấy dữ liệu trên local
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const user = JSON.parse(localStorage.getItem("users"));

const userLoginElement = document.getElementById("userLogin");

if (userLogin) {
  // Hiển thị tên của user đang đăng nhập lên header
  userLoginElement.innerHTML = userLogin.userName;
} else {
  userLoginElement.innerHTML = "Login";
}

window.onload = function () {
  displayProducts();
};

function displayProducts() {
  const productContainer = document.getElementById("productListSP"); // Giả sử productContainer là nơi bạn muốn hiển thị sản phẩm

  const products = JSON.parse(localStorage.getItem("products")) || [];
  // Duyệt qua danh sách sản phẩm và tạo HTML cho mỗi sản phẩm
  products.forEach((product) => {
    // Tạo một chuỗi HTML đại diện cho sản phẩm
    const productHTML = `
    <div class='product-item'>
      <div class="img-container">
        <img class="img-item" onclick = "inforPage (${product.id})"  src="${product.img}" alt="">
      </div>
      <div class="info">
        <h3>${product.name}</h3>
        <h3>(${product.description})</h3>
        <h3 style="color: red;">${product.price}đ</h3>
      </div>
    </div>
    `;

    // Chèn chuỗi HTML vào nơi bạn muốn hiển thị sản phẩm
    productContainer.innerHTML += productHTML;
  
  });

}
function inforPage(productId) {
  let productData = JSON.parse(localStorage.getItem("products"));
  let product = productData.find(item => item.id=== productId);
  window.location.href = `/sp/sp1.html?productId=${productId}`
}