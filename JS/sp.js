const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const user = JSON.parse(localStorage.getItem("users"));
const products = JSON.parse(localStorage.getItem("products"))

const userLoginElement = document.getElementById("userLogin");

if (userLogin) {
    // Hiển thị tên của user đang đăng nhập lên header
    userLoginElement.innerHTML = userLogin.userName;
} else {
    userLoginElement.innerHTML = "Login";
}

function renderInformation() {
    const urlParams = new URLSearchParams(window.location.search);
    const informationId = urlParams.get("productId");
    // console.log(informationId);
    let element = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == informationId) {
            element +=
                `
                    <div>
            <img src="${products[i].img}" alt="">
            <div class="thongtin">
                <p>Đảm bảo máy mới nguyên hộp, nguyên seal, chưa kích hoạt bảo hành. Bảo hành chính hãng điện thoại 1
                    năm.</p>
                <p>Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp Lightning - Type C</p>
                <p>Ship COD toàn quốc. Nhận hàng kiểm tra mới thanh toán</p>
            </div>
        </div>
        <div class="selltt">
            <h3>${products[i].name} - (${products[i].description})</h3>
            <p>Tình trạng : Sẵn hàng</p>
            <h4 style="color: red;">${products[i].price}</h4>
            <img src="../img/acma.png" alt="">
            <a >
            <div><button onclick = "orderProducts(${i})">MUA NGAY <br> (thêm vào giỏ hàng và thanh toán)</button></div>
        </div></a>
            `
        }
    }
    document.querySelector(".allsell").innerHTML = element;
}
renderInformation();
// sự kiện đưa sản phẩm vào giỏ hàng
function orderProducts(index) {
    swal({
        title: "Thêm sản phẩm vào giỏ hàng thành công!",
        icon: "success",
    });
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(products[index])
    localStorage.setItem("cart", JSON.stringify(cart));

}
