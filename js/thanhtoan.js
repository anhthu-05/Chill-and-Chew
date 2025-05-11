let productInCart = localStorage.getItem('products')
  ? JSON.parse(localStorage.getItem('products'))
  : [];


function loadCheckout() {
  renderCheckoutProducts();
  calculateCheckoutTotal();
  handleFormSubmit();
}


function renderCheckoutProducts() {
  const tbody = document.getElementById('checkout-table-body');
  tbody.innerHTML = '';


  productInCart.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td><img src="${item.image}" width="80" /></td>
      <td>${item.quantity}</td>
      <td>${(item.quantity * parseInt(item.price.replace(/,/g, ''))).toLocaleString()} VND</td>
    `;
    tbody.appendChild(row);
  });
}


function calculateCheckoutTotal() {
  const total = productInCart.reduce((sum, item) => {
    return sum + item.quantity * parseInt(item.price.replace(/,/g, ''));
  }, 0);
  document.getElementById('checkout-total').innerText = total.toLocaleString();
}


function handleFormSubmit() {
  const form = document.getElementById('checkout-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();


    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment-method').value;


    if (!name || !phone || !address || !payment) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }


    alert('Đặt hàng thành công!\nCảm ơn bạn đã mua hàng.');
    localStorage.removeItem('products'); // Xoá giỏ hàng sau khi đặt hàng
    window.location.href = 'index.html'; // Chuyển về trang chủ
  });
}



