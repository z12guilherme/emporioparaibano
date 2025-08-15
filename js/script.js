/* script.js — versão completa, corrigida e com persistência
   - identifica itens por id (slug)
   - previne clicks duplicados
   - corrige incremento/decremento
   - persiste em localStorage (emporio_cart_v1)
   - carrinho arrastável com pin
   - scroll do carrossel e envio p/ WhatsApp
*/
window.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'emporio_cart_v1';
  let cart = [];

  const produtos = {
    temperos: [
      { name: 'Tempero Ana Maria', desc: 'Tempero para arroz, frango, feijão e sopas.', price: 5, img: 'img/anamaria.jpg' },
      { name: 'Tempero Chimichurri', desc: 'Mistura aromática para carnes e grelhados.', price: 10, img: 'img/chimichurri.jpg' },
      { name: 'Sal Grosso', desc: 'Sal para churrascos e temperos variados.', price: 7, img: 'https://via.placeholder.com/250x200?text=Tempero+3' },
      { name: 'Pimenta-do-reino', desc: 'Pimenta moída na hora para dar sabor intenso.', price: 6, img: 'https://via.placeholder.com/250x200?text=Tempero+4' },
      { name: 'Alho Granulado', desc: 'Alho seco para sopas, molhos e carnes.', price: 8, img: 'https://via.placeholder.com/250x200?text=Tempero+5' },
      { name: 'Colorau', desc: 'Tempero natural para dar cor e sabor aos pratos.', price: 5, img: 'https://via.placeholder.com/250x200?text=Tempero+6' },
    ],
    molhos: []
  };

  /* persistence */
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(i => ({
        id: String(i.id || ''),
        name: String(i.name || ''),
        price: Number(i.price) || 0,
        qty: Math.max(0, Math.floor(Number(i.qty) || 0))
      })).filter(i => i.qty > 0);
    } catch (e) {
      console.warn('Erro ao carregar carrinho', e);
      return [];
    }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
    catch (e) { console.warn('Erro ao salvar carrinho', e); }
  }

  /* utils */
  function slugify(str) {
    return String(str || '')
      .toLowerCase()
      .normalize?.('NFD').replace(/\p{Diacritic}/gu, '') // remove acentos quando suportado
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  function esc(s){ return String(s).replace(/"/g, '&quot;'); }

  /* render produtos */
  function gerarCard(prod) {
    const id = slugify(prod.name);
    return `
      <div class="card" role="article" data-id="${id}">
        <img src="${prod.img}" class="card-img-top" alt="${esc(prod.name)}" loading="lazy">
        <div class="card-body">
          <h5 class="card-title">${esc(prod.name)}</h5>
          <p class="card-text">${esc(prod.desc)}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <p class="fw-bold">R$ ${Number(prod.price).toFixed(2)}</p>
            <button class="btn bg-yellow" type="button" data-id="${id}" data-name="${esc(prod.name)}" data-price="${Number(prod.price)}">Adicionar</button>
          </div>
        </div>
      </div>`;
  }
  function renderProdutos() {
    ['temperos','molhos'].forEach(cat => {
      const carousel = document.getElementById(`${cat}-carousel`);
      if (!carousel) return;
      carousel.innerHTML = '';
      const list = produtos[cat] || [];
      list.forEach(p => carousel.insertAdjacentHTML('beforeend', gerarCard(p)));
    });
  }

  /* cart logic */
  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    if (!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="name">${esc(item.name)}</div>
        <div class="controls" aria-hidden="false">
          <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Diminuir">−</button>
          <div style="min-width:28px;text-align:center;" data-qty-for="${item.id}">${item.qty}</div>
          <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar">+</button>
        </div>
        <div class="item-price">R$ ${(item.price * item.qty).toFixed(2)}</div>
      `;
      cartItems.appendChild(li);
      total += item.price * item.qty;
    });
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = cart.reduce((acc,i)=>acc+i.qty,0);
    saveCart();
  }

  function addToCart(id, name, price) {
    if (!id || !name || Number.isNaN(Number(price))) return;
    const idx = cart.findIndex(i => i.id === id);
    if (idx !== -1) cart[idx].qty += 1;
    else cart.push({ id, name, price: Number(price), qty: 1 });
    renderCart();
  }
  window.addToCart = addToCart; // compatibilidade

  function changeQty(id, delta) {
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx,1);
    renderCart();
  }

  /* event delegation with double-click protection */
  document.addEventListener('click', (e) => {
    // adicionar
    const addBtn = e.target.closest('button[data-id][data-name][data-price]');
    if (addBtn) {
      if (addBtn.dataset.processing) return;
      addBtn.dataset.processing = '1';
      setTimeout(()=>{ delete addBtn.dataset.processing; }, 300);
      const id = addBtn.getAttribute('data-id');
      const name = addBtn.getAttribute('data-name');
      const price = parseFloat(addBtn.getAttribute('data-price'));
      addToCart(id, name, price);
      return;
    }
    // + / - no carrinho
    const qtyBtn = e.target.closest('button[data-action][data-id]');
    if (qtyBtn) {
      if (qtyBtn.dataset.processing) return;
      qtyBtn.dataset.processing = '1';
      setTimeout(()=>{ delete qtyBtn.dataset.processing; }, 200);
      const action = qtyBtn.getAttribute('data-action');
      const id = qtyBtn.getAttribute('data-id');
      if (action === 'inc') changeQty(id, 1);
      if (action === 'dec') changeQty(id, -1);
    }
  });

  /* send to WhatsApp */
  window.sendToWhatsApp = function() {
    if (cart.length === 0) { alert('Seu carrinho está vazio!'); return; }
    const lines = ['Olá! Quero fazer o seguinte pedido:'];
    cart.forEach(i => lines.push(`- ${i.name} (Qtd: ${i.qty}) - R$ ${(i.price * i.qty).toFixed(2)}`));
    lines.push(`Total: R$ ${document.getElementById('cart-total')?.textContent || '0.00'}`);
    const message = encodeURIComponent(lines.join('\n'));
    const phone = '5581991889242';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  /* scroll helper (usado no HTML) */
  window.scrollCarousel = function(id, distance) {
    const carousel = document.getElementById(id);
    if (!carousel) return;
    carousel.scrollBy({ left: distance, behavior: 'smooth' });
  };

  /* drag + pin */
  (function enableDrag(){
    const cartDiv = document.getElementById('cart');
    if (!cartDiv) return;
    let isDragging = false, startX=0, startY=0, startLeft=0, startTop=0, pinned=false;

    const setPinnedUI = () => {
      const btn = document.getElementById('cart-toggle');
      if (!btn) return;
      btn.textContent = pinned ? '📍' : '📌';
    };

    const onStart = (clientX, clientY) => {
      if (pinned) return;
      isDragging = true;
      const rect = cartDiv.getBoundingClientRect();
      startX = clientX; startY = clientY;
      startLeft = rect.left; startTop = rect.top;
      cartDiv.style.transition = 'none';
      if (!cartDiv.style.left) cartDiv.style.left = `${startLeft}px`;
      if (!cartDiv.style.top) cartDiv.style.top = `${startTop}px`;
      cartDiv.style.right = 'auto'; cartDiv.style.bottom = 'auto';
    };
    const onMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - startX, dy = clientY - startY;
      const newLeft = Math.max(8, Math.min(window.innerWidth - cartDiv.offsetWidth - 8, startLeft + dx));
      const newTop = Math.max(8, Math.min(window.innerHeight - cartDiv.offsetHeight - 8, startTop + dy));
      cartDiv.style.left = `${newLeft}px`;
      cartDiv.style.top = `${newTop}px`;
    };
    const onEnd = () => { if (!isDragging) return; isDragging = false; cartDiv.style.transition = ''; };

    cartDiv.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input, textarea, select')) return;
      onStart(e.clientX, e.clientY);
    });
    document.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    document.addEventListener('mouseup', onEnd);

    cartDiv.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, a, input, textarea, select')) return;
      const t = e.touches[0]; onStart(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const t = e.touches[0]; onMove(t.clientX, t.clientY);
    }, { passive: true });
    document.addEventListener('touchend', onEnd);

    document.getElementById('cart-toggle')?.addEventListener('click', () => { pinned = !pinned; setPinnedUI(); });
    setPinnedUI();
  })();

  /* init */
  cart = loadCart();
  renderCart();
  renderProdutos();
});