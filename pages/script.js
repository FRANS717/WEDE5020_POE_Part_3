




let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(button) {
  const product = button.parentElement;
  const name = product.getAttribute('data-name');
  const price = parseFloat(product.getAttribute('data-price'));

  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = cart.length;
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = count;
}

function displayCartItems() {
  const list = document.getElementById('cart-items');
  const totalBox = document.getElementById('cart-total');

  if (list) {
    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const li = document.createElement('li');
      li.innerHTML = `${item.name} - R${item.price.toFixed(2)} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
      list.appendChild(li);
    });

    if (totalBox) {
      totalBox.textContent = "Total: R" + total.toFixed(2);
    }
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(prod => {
    if (category === 'all' || prod.dataset.category === category) {
      prod.style.display = 'block';
    } else {
      prod.style.display = 'none';
    }
  });
}

window.onload = () => {
  updateCartCount();
  displayCartItems();
};

function goToDelivery() {
  // Save total amount to localStorage before redirecting
  const totalBox = document.getElementById('cart-total');
  if (totalBox) {
    const totalText = totalBox.textContent.replace("Total: R", "").trim();
    localStorage.setItem('cartTotal', totalText);
  }
  window.location.href = "delivery.html";
}




