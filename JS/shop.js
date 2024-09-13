const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const user = JSON.parse(localStorage.getItem("users"));

const userLoginElement = document.getElementById("userLogin");
let sumPrice;
let temp = 0;
let priceAll = document.querySelector(".price");
if (userLogin) {
    // Hiển thị tên của user đang đăng nhập lên header
    userLoginElement.innerHTML = userLogin.userName;
} else {
    userLoginElement.innerHTML = "Login";
}

let tbody = document.querySelector('tbody');
const products = JSON.parse(localStorage.getItem("products"))
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function renderCart() {
    tbody.innerHTML = "";
    priceAll.innerHTML = "";
    sumPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        tbody.innerHTML += `          
                     <tr class="products">
                        <td class="text-center hidden-xs" style="width: 90px">
                            <a href="#" title=""><img
                                    src="${cart[i].img}"
                                    alt="iPhone 11 Pro 64Gb (LikeNew 99%)" width="60px" height="60px"></a>
                        </td>
                        <td class="product-name">
                            <p><span><span class="hidden-xs">${cart[i].name} &ensp; ${cart[i].description} </span><span
                                        class="hidden-lg hidden-md hidden-sm"></span></span>
                            </p>
                            <p style="font-size: 13px;"><br style="margin-bottom: 0">
                            </p>
                        </td>

                        <input type="hidden" class="id_pro" name="id_pro[]" ref="62" value="54">

                        <input type="hidden" class="rowId" value="">

                        <td id="product-price" class="text-right hide-phone price">
                            ${cart[i].price}<span class="currencySymbol">₫</span>
                        </td>

                        
                        <td class="text-right"><button id_pro="54" class="cart_delete"  onclick="deletecart(${i})"><i
                                    class="fa fa-trash"></i></button>
                        </td>
                    </tr>`
        sumPrice += Number(cart[i].price);
    }
    priceAll.textContent = sumPrice + "đ";
}
document.addEventListener("DOMContentLoaded", renderCart);

function deletecart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
    renderCart();
}

function buy() {
    swal({
        title: "Bạn có chắc muốn mua hàng?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Đặt mua thành công", {
                    icon: "success",
                })
                    .then(() => {
                        let cartItem = [];
                        localStorage.setItem("cart", JSON.stringify(cartItem));
                        window.location.href = "/home/index.html"
                    });
            } else {
                swal("Đơn đặt mua đã được hủy.");
            }
        });
}
