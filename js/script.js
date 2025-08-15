// ...existing code...
/* script.js — versão completa com lista de temperos atualizada
   - persistência localStorage
   - carrinho sem bug (identificação por id, delegação, proteção contra cliques duplos)
   - carrinho arrastável com pin
   - geração automática de cards
*/
window.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'emporio_cart_v1';
  let cart = [];

  const produtos = {
    temperos: [
      // itens preservados / atualizados
      { name: 'Tempero Ana Maria (100g)', desc: 'O tempero Ana Maria é um mix de temperos popular no Brasil, como: alho, cebola, salsa, cebolinha, manjericão, orégano, pimentão, tomate, e caldo de galinha. Ideal para realçar carnes, aves, peixes, legumes, sopas, ensopados, arroz e feijão.', price: 4.99, img: 'https://via.placeholder.com/250x200?text=Tempero+Ana+Maria' },
      
      { name: 'Tempero Chimichurri tradicional (100g)', desc: 'Mistura de ervas e especiarias secas (cebola, alho, salsa, orégano, manjericão, pimentão), sem pimenta. Versátil para carnes, aves, peixes, legumes e outros pratos.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Chimichurri+Tradicional' },
      
      { name: 'Tempero Chimichurri Defumado (100g)', desc: 'Mistura de ervas e especiarias com fumaça em pó para dar toque defumado a carnes, aves, peixes e legumes.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Chimichurri+Defumado' },
      
      { name: 'Tempero Chimichurri com Pimenta (100g)', desc: 'Chimichurri com adição de pimenta para toque apimentado em carnes, aves, peixes e legumes.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Chimichurri+Com+Pimenta' },

      { name: 'Tempero Edu Guedes tradicional (100g)', desc: 'Mistura desidratada: cebola, cenoura, pimentão, cebolinha, salsa, alho granulado e manjericão. Ideal para molhos, carnes e arroz.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Edu+Guedes+Tradicional' },
      
      { name: 'Tempero Edu Guedes completo (100g)', desc: 'Versão completa com açafrão e outros ingredientes desidratados para sabor e cor em molhos, carnes e arroz.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Edu+Guedes+Completo' },

      { name: 'Tempero Feijãozinho (100g)', desc: 'Contém cebola, alho, salsa, proteína de soja sabor bacon, caldo de bacon e colorau. Prático para feijão, feijoada, sopas e caldos.', price: 4.99, img: 'https://via.placeholder.com/250x200?text=Tempero+Feijaozinho' },

      { name: 'Tempero Pega Esposa (100g)', desc: 'Alho, cebola, pimentões, cenoura, folhas de louro e ervas desidratadas (salsa, orégano, manjericão, alecrim). Ótimo para bifes, frango, peixes e saladas.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Pega+Esposa' },

      { name: 'Tempero Lemon Pepper (100g)', desc: 'Combinação de raspas de limão, sal e pimenta-do-reino moída. Excelente em carnes suínas, aves, peixes, legumes e saladas.', price: 4.99, img: 'https://via.placeholder.com/250x200?text=Lemon+Pepper' },

      { name: 'Tempero Pega Marido (100g)', desc: 'Cebola desidratada, alho granulado, pimentão vermelho, tomate seco, mostarda, alecrim, cebolinha, manjericão e louro. Para arroz, refogados, carnes e sopas.', price: 5.50, img: 'https://via.placeholder.com/250x200?text=Pega+Marido' },

      { name: 'Páprica Doce (100g)', desc: 'Pimentões secos moídos que adicionam cor suave e sabor delicado a carnes, aves, peixes, sopas e molhos.', price: 4.00, img: 'https://via.placeholder.com/250x200?text=Paprica+Doce' },
      
      { name: 'Páprica Defumada (100g)', desc: 'Pimentões defumados moídos que adicionam sabor e aroma defumado a carnes, aves, peixes e molhos.', price: 4.50, img: 'https://via.placeholder.com/250x200?text=Paprica+Defumada' },
      
      { name: 'Páprica Picante (100g)', desc: 'Pimentões secos com adição de pimenta, para dar toque picante e cor a pratos diversos.', price: 4.00, img: 'https://via.placeholder.com/250x200?text=Paprica+Picante' },

      { name: 'Açafrão (100g)', desc: 'Também conhecido como cúrcuma, adiciona cor, sabor e propriedades benéficas. Usado em carnes, arroz, sopas e molhos.', price: 4.00, img: 'https://via.placeholder.com/250x200?text=Acafrao' },

      { name: 'Colorau Paraíba (100g)', desc: 'Colorau de coloração vibrante, usado em arroz, feijão, carnes e molhos para cor e sabor suave.', price: 4.00, img: 'https://via.placeholder.com/250x200?text=Colorau+Paraiba' },
      
      { name: 'Colorau Tradicional (100g)', desc: 'Urucum em pó que adiciona cor avermelhada e sabor levemente terroso a pratos brasileiros.', price: 3.00, img: 'https://via.placeholder.com/250x200?text=Colorau+Tradicional' },

      { name: 'Cominho Moído (100g)', desc: 'Especiaria versátil para carnes, legumes, ovos, feijão, lentilha, arroz, batatas e sopas.', price: 4.50, img: 'https://via.placeholder.com/250x200?text=Cominho' },

      { name: 'Mix para Arroz (100g)', desc: 'Composto de cebola, alho e cenoura desidratados para dar sabor de refogado ao arroz e outros pratos.', price: 5.00, img: 'https://via.placeholder.com/250x200?text=Mix+para+Arroz' },

      { name: 'Caldo de Galinha em Pó (menos sódio) (100g)', desc: 'Caldo em pó com menos sódio para substituir cubos, prático em sopas, cozidos e molhos.', price: 3.80, img: 'https://via.placeholder.com/250x200?text=Caldo+Galinha' },

      { name: 'Tempero Tempera Tudo (100g)', desc: 'Mistura de especiarias para dar sabor a carnes, legumes, saladas, sopas e ovos.', price: 5.00, img: 'https://via.placeholder.com/250x200?text=Tempera+Tudo' },

      { name: 'Fumaça em pó (100g)', desc: 'Condimento para conferir sabor defumado a carnes, molhos, sopas e até preparações doces como molho barbecue.', price: 6.00, img: 'https://via.placeholder.com/250x200?text=Fumaca+em+Po' },
      
      { name: 'Sal Grosso (100g)', desc: 'Sal grosso ideal para churrascos e temperos diversos.', price: 7.00, img: 'https://via.placeholder.com/250x200?text=Sal+Grosso' },
      
      { name: 'Pimenta-do-reino (100g)', desc: 'Pimenta do reino moída para sabor intenso.', price: 6.00, img: 'https://via.placeholder.com/250x200?text=Pimenta+do+Reino' },
      
      { name: 'Alho Granulado (100g)', desc: 'Alho seco para sopas, molhos e carnes.', price: 8.00, img: 'https://via.placeholder.com/250x200?text=Alho+Granulado' }
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
  renderProdutos();
  renderCart();
});