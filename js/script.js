let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  let message = 'Olá! Quero fazer o seguinte pedido:%0A';
  cart.forEach(item => {
    message += `- ${item.name} - R$ ${item.price.toFixed(2)}%0A`;
  });
  message += `%0ATotal: R$ ${document.getElementById('cart-total').textContent}`;
  
  // Substitua pelo seu número no formato: 55DDDNUMERO
  const phone = '5581991889242';
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}