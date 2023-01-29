const productDiv = document.getElementById("all-products");
const cartProductsDiv = document.getElementById("cart-products");
const cartTotalDiv = document.getElementById("cart-total");
let products;
let cartItem = JSON.parse(localStorage.getItem("cartItem")) || [];

// (Task-1) Display Product Using JSON Data
fetch("json/products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        products = data;
        console.log(products);

        for (let i = 0; i < data.length; i++) {
            productDiv.innerHTML +=
                ` <div class="col-lg-4 mt-4">
               <div class="single-product">
              <img class="w-100" src="${data[i].image}" alt="">
              <h5 class="mt-4">$<span id="productPrice">${data[i].price}</span></h5>
              <h3>${data[i].name}</h3>
             <p>${data[i].text}</p>
             <button onClick = "addToCart('${data[i].id}')">Add To Cart</button>
        </div>
        
    </div>`;

        }
    })
    .catch(function (error) {
        console.log(error);
    });



function addToCart(productId) {
    const product = products.find((product) => product.id == productId);

    //(Task-2) Create Product Front End
    const cartProduct = `
        <div class="cart-product" id="id2">
        <img src="${product.image}" alt="" />
        <h3>
        ${product.name} (Price: $<span id="product-price">${product.price})</span>
        </h3>
        <h5>Quantity: 1</h5>
        <h5>Sub Total: ${product.price}</h5>
        <button class="remove-item">X</button>
      </div>
      `;

    cartProductsDiv.innerHTML += cartProduct;

    //(Task-3) Add Product LocalStorage
    cartItem.push(product);
    product.quantity = 1;
    localStorage.setItem("cartItem", JSON.stringify(cartItem));

    // Cart Total
    cartTotal();


}

//(Task-4) Display Product From LocalStorage
function displayCart() {
    for (let i = 0; i <= cartItem.length; i++) {
        cartProductsDiv.innerHTML += `
        <div class="cart-product" id="id2">
        <img src="${cartItem[i].image}" alt="" />
        <h3>
        ${cartItem[i].name} (Price: $<span id="product-price">${cartItem[i].price})</span>
        </h3>
        <h5>Quantity: ${cartItem[i].quantity}</h5>
        <h5>Sub Total: ${cartItem[i].price}</h5>
        <button class="remove-item">X</button>
      </div>
        `
    }
}

displayCart();

// Get Cart Total
function cartTotal() {
    const temp = cartItem.map(function (item) {
        return parseFloat(item.price) * parseFloat(item.quantity);
    });
    const sum = temp.reduce(function (prev, next) {
        return prev + next;
    }, 0);
    cartTotalDiv.innerText = sum;
}
cartTotal();
