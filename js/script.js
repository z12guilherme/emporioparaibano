// Lista de produtos com categorias
const products = [
  { name: 'Tempero Ana Maria (100g)', price: 5, description: 'Tempero para arroz, frango, feijão, sopa', img: 'img/anamaria.jpeg', category: 'Temperos' },
  { name: 'Tempero Chimichurri (100g)', price: 10, description: 'Mistura aromática para carnes e grelhados', img: 'img/chimichurri.jpg', category: 'Temperos' },
  { name: 'Molho de Pimenta (150ml)', price: 8, description: 'Molho apimentado artesanal', img: 'img/molho.jpg', category: 'Molhos' },
  { name: 'Molho Barbecue (200ml)', price: 12, description: 'Molho barbecue defumado', img: 'img/barbecue.jpg', category: 'Molhos' },
];

let cart = [];
let currentCategory = 'Todos';

// Renderiza produtos filtrando por categoria
function renderProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  const filteredProducts = currentCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === currentCategory);

  filteredProducts.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="fw-bold">R$ ${product.price.toFixed(2)}</p>
          <button class="btn bg-yellow" onclick="addToCart('${product.name}', ${product.price})">Adicionar</button>
        </div>
      </div>
    `;
    productList.appendChild(col);
  });
}

// Filtra categoria e marca botão ativo
function filterCategory(category, button) {
  currentCategory = category;
  renderProducts();

  // Atualiza botão ativo
  const buttons = document.querySelectorAll('#category-buttons button');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

// Carrinho
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
    li.classList.add('cart-item');
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Envia pedido para WhatsApp
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
  
  const phone = '5581991889242'; // Substitua pelo seu número
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

// Inicializa página
renderProducts();
