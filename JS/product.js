window.onload = function () {
  displayProducts();
};


let dataBase64 = null

function displayProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  // Get products from Local Storage
  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td type="number">$${product.price}</td>
        <td>${product.description}</td>
        <td><img src="${product.img}" alt="${product.name}" style="max-width: 100px;"></td>
        <td>
          <button onclick="editProduct(${product.id})">Edit</button>
          <button onclick="deleteProduct(${product.id})">Delete</button>
        </td>
      `;
    productList.appendChild(row);
  });
}

function editProduct(id) {
  // Find product by id
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productToEdit = products.find((product) => product.id === id);
  console.log(productToEdit);
  if (productToEdit) {
    const newName = prompt("Enter new name:", productToEdit.name);
    const newPrice = prompt("Enter new price:", productToEdit.price);
    const newDescription = prompt(
      "Enter new description:",
      productToEdit.description
    );

    // Update product
    productToEdit.name = newName;
    productToEdit.price = newPrice;
    productToEdit.description = newDescription;

    // Update Local Storage
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh table
    displayProducts();
  } else {
    alert("Product not found!");
  }
}

function deleteProduct(id) {
  // Find product by id
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex !== -1) {
    // Remove product from array
    products.splice(productIndex, 1);

    // Update Local Storage
    localStorage.setItem("products", JSON.stringify(products));

    // Refresh table
    displayProducts();
  } else {
    alert("Product not found!");
  }
}

function addProduct() {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").files[0];

  if (productName && productPrice && productDescription && dataBase64) {

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      description: productDescription,
      // image: imageDataURL,
      img: dataBase64
    };

    // Get existing products from Local Storage or create empty array
    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product to array
    products.push(newProduct);

    // Save updated products array to Local Storage
    localStorage.setItem("products", JSON.stringify(products));

    // Clear form fields
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productImage").value = "";
    dataBase64 = null
    document.getElementById('id-product-add-image').src = ''

    // Refresh table
    displayProducts();
  } else {
    alert("Please fill in all fields and choose an image.");
  }
}


// Load default content (Dashboard) when page loads

// Add event listeners to sidebar links
document
  .getElementById("dashboardLink")
  .addEventListener("click",function (event) {
    event.preventDefault();
    window.location.href="index.html"
  })
document
  .getElementById("logoutBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href="adminlogin.html"
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


function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    // console.log(reader.result);
    dataBase64 = reader.result
    document.getElementById('id-product-add-image').src = dataBase64
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}


document.getElementById('productImage').addEventListener('change', (e) => {
  getBase64(e.target.files[0])
})

