let cart = [];

// Produtos
const produtos = {
  temperos: [
    { name: 'Tempero Ana Maria', desc: 'Tempero para arroz, frango, feijão e sopas.', price: 5, img: 'img/anamaria.jpg' },
    { name: 'Tempero Chimichurri', desc: 'Mistura aromática para carnes e grelhados.', price: 10, img: 'https://via.placeholder.com/250x200?text=Tempero+2' },
    { name: 'Sal Grosso', desc: 'Sal para churrascos e temperos variados.', price: 7, img: 'https://via.placeholder.com/250x200?text=Tempero+3' },
    { name: 'Pimenta-do-reino', desc: 'Pimenta moída na hora para dar sabor intenso.', price: 6, img: 'https://via.placeholder.com/250x200?text=Tempero+4' },
    { name: 'Alho Granulado', desc: 'Alho seco para sopas, molhos e carnes.', price: 8, img: 'https://via.placeholder.com/250x200?text=Tempero+5' },
    { name: 'Colorau', desc: 'Tempero natural para dar cor e sabor aos pratos.', price: 5, img: 'https://via.placeholder.com/250x200?text=Tempero+6' },
  ]
};

// Render produtos
function renderProdutos() {
  ['temperos', 'molhos'].forEach(cat => {
    const carousel = document.getElementById(`${cat}-carousel`);
    carousel.innerHTML = '';
    produtos[cat].forEach(p => carousel.innerHTML += gerarCard(p));
  });
}

// Cria card
function gerarCard(prod) {
  return `
  <div class="card">
    <img src="${prod.img}" class="card-img-top" alt="${prod.name}">
    <div class="card-body">
      <h5 class="card-title">${prod.name}</h5>
      <p class="card-text">${prod.desc}</p>
      <p class="fw-bold">R$ ${prod.price.toFixed(2)}</p>
      <button class="btn bg-yellow w-100" onclick="addToCart('${prod.name}', ${prod.price})">Adicionar</button>
    </div>
  </div>`;
}

// Scroll carrossel
function scrollCarousel(id, distance) {
  const carousel = document.getElementById(id);
  carousel.scrollBy({ left: distance, behavior: 'smooth' });
}

// Carrinho
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.textContent = `${item.name} (Qtd: ${item.qty}) - R$ ${(item.price*item.qty).toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
  document.getElementById('cart-count').textContent = cart.reduce((acc,i)=>acc+i.qty,0);
}

function sendToWhatsApp() {
  if (cart.length === 0) { alert('Seu carrinho está vazio!'); return; }
  let message = 'Olá! Quero fazer o seguinte pedido:%0A';
  cart.forEach(item => {
    message += `- ${item.name} (Qtd: ${item.qty}) - R$ ${(item.price*item.qty).toFixed(2)}%0A`;
  });
  message += `%0ATotal: R$ ${document.getElementById('cart-total').textContent}`;
  const phone = '5581991889242';
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Scroll suave
document.querySelectorAll('.scroll-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Inicializa
renderProdutos();
