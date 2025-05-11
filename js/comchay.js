const products = [{
        id: 4,
        name: 'Cơm cháy',
        image: '/img/Shop/sp2.1_comchay.jpg',
        price: '120,000',
        detail: '/chitietsanpham/sp2.1.html'
    }, {
        id: 5,
        name: 'Cơm cháy mỡ hành',
        image: '/img/Shop/sp2.2_comchaymohanh.jpg',
        price: '150,000',
        detail: '/chitietsanpham/sp2.2.html'
    },
    {
        id: 6,
        name: 'Cơm cháy gạo lứt',
        image: '/img/Shop/sp2.3_comchaygaoluc.jpg',
        price: '200,000',
        detail: '/chitietsanpham/sp2.3.html'
    }
]
// Gio hang
let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []


// tuong tac voi localStorage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productInCart))
}


// Shop page
// Hien thi product len trang web
function renderProducts() {
    let data = ``;
    products.map(value => {
        data += `
    <div class='col-md-4 col-sm-6 card-product-custom'>
    <div class='card' style='--bs-body-bg: #fcfcfce7; border-width: 0'>
      <img src='${value.image}' class='card-img-top product-img' alt='' />
      <div class='card-body'>
        <a href='${value.detail}' class='text-reset'><h5 class='card-title product-name-custom fw-bold'>${value.name}</h5></a>
        <p class='card-text product-name-custom'>${value.price} VND</p>
      </div>
      <div class='card-footer border-0 bg-transparent text-center pb-3'>
        <button onclick='addtoCart(${value.id})' class='btn btn-dark'>
          Add to cart
        </button>
      </div>
    </div>
  </div>
  `;
    });
    document.getElementById('products').innerHTML = data;
}


// Them sp vao gio hang
function addtoCart(id) {
    let checkProduct = productInCart.some(value => value.id === id)
    if (!checkProduct) {
        let product = products.find(value => value.id === id)
        productInCart.unshift({
            ...product, //lay toan bo
            quantity: 1
        })
        saveToLocalStorage();
    } else {
        let getIndex = productInCart.findIndex(value => value.id === id) //lay vi tri sp
        let product = productInCart.find(value => value.id === id)
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        }
        saveToLocalStorage();
    }
    alert('Đã thêm vào giỏ hàng');
}


// Shop Load
function shopLoad() {
    renderProducts()
}




// Cart page
function renderProductsToTable() {
    let data = ``;
    productInCart.map((value, index) => {
        data += `
    <tr>
        <td>${value.name}</td>
        <td><img src='${value.image}' width='100' alt=''></td>
        <td>${value.price}</td>
        <td>
         <div class="d-flex align-items-center">
            <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-dark'>-</button>
            <div class='mx-2 products-cart-custom' style='font-size: 17px; width: 30px'>${value.quantity}</div>
            <button onclick='plusQuantity(${index})' class='btn btn-dark'>+</button>
         </div>
        </td>
        <td>
            ${(value.quantity * value.price.replace(/,/g,'')).toLocaleString('en-US')}
        </td>
        <td><button onclick='deleteProductInCart(${index})' class='btn '><i class="fas fa-times-circle"></i></button></td>
    </tr>
    `
    })
    document.getElementById('products-cart').innerHTML = data;
}


// tang so luong sp
function plusQuantity(index) {
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity
    }
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
}


// giam so luong sp, min = 1
function minusQuantity(index, quantity) {
    if (quantity > 1) {
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity
        }
        saveToLocalStorage();
        renderProductsToTable();
        totalMoney();
    } else {
        alert('Số lượng nhỏ nhất là 1');
    }
}


// xoa sp
function deleteProductInCart(index) {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
}


// tong tien don hang - total
function totalMoney() {
    if (productInCart !== []) {
        let total = 0;
        for (let i = 0; i < productInCart.length; i++) {
            total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
        }
        document.getElementById("total-money").innerHTML = total.toLocaleString('en-US')
    }
}


// Cart Load
function cartLoad() {
    renderProductsToTable();
    totalMoney();
}
