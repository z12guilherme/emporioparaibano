// script.js — versão completa com lista de temperos atualizada
// persistência localStorage
// carrinho sem bug (identificação por id, delegação, proteção contra cliques duplos)
// carrinho arrastável com pin
// geração automática de cards
window.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'emporio_cart_v1';
  let cart = [];

  const produtos = {
    temperos: [
      { name: 'Tempero Ana Maria (100g)', desc: 'O tempero Ana Maria é um mix de temperos popular no Brasil, como: alho, cebola, salsa, cebolinha, manjericão, orégano, pimentão, tomate, e caldo de galinha. Ideal para realçar carnes, aves, peixes, legumes, sopas, ensopados, arroz e feijão.', price: 5.00, img: 'img/anamaria.jpg' },
      { name: 'Tempero Chimichurri tradicional (100g)', desc: 'Mistura de ervas e especiarias secas (cebola, alho, salsa, orégano, manjericão, pimentão), sem pimenta. Versátil para carnes, aves, peixes, legumes e outros pratos.', price: 5.50, img: 'img/chimichurri.jpg' },
      { name: 'Tempero Chimichurri Defumado (100g)', desc: 'Mistura de ervas e especiarias com fumaça em pó para dar toque defumado a carnes, aves, peixes e legumes.', price: 5.50, img: 'img/chimichurri_defumado.jpg' },
      { name: 'Tempero Chimichurri com Pimenta (100g)', desc: 'Chimichurri com adição de pimenta para toque apimentado em carnes, aves, peixes e legumes.', price: 5.50, img: 'img/chimichurri_com_pimenta.jpg' },
      { name: 'Tempero Edu Guedes tradicional (100g)', desc: 'Mistura desidratada: cebola, cenoura, pimentão, cebolinha, salsa, alho granulado e manjericão. Ideal para molhos, carnes e arroz.', price: 5.50, img: 'img/edu_guedes_tradicional.jpg' },
      { name: 'Tempero Edu Guedes completo (100g)', desc: 'Versão completa com açafrão e outros ingredientes desidratados para sabor e cor em molhos, carnes e arroz.', price: 5.50, img: 'img/edu_guedes_completo.jpg' },
      { name: 'Tempero Feijãozinho (100g)', desc: 'Contém cebola, alho, salsa, proteína de soja sabor bacon, caldo de bacon e colorau. Prático para feijão, feijoada, sopas e caldos.', price: 4.99, img: 'img/feijaozinho.jpg' },
      { name: 'Tempero Pega Esposa (100g)', desc: 'Alho, cebola, pimentões, cenoura, folhas de louro e ervas desidratadas (salsa, orégano, manjericão, alecrim). Ótimo para bifes, frango, peixes e saladas.', price: 5.50, img: 'img/pega_esposa.jpg' },
      { name: 'Tempero Lemon Pepper (100g)', desc: 'Combinação de raspas de limão, sal e pimenta-do-reino moída. Excelente em carnes suínas, aves, peixes, legumes e saladas.', price: 4.99, img: 'img/lemon_pepper.jpg' },
      { name: 'Tempero Pega Marido (100g)', desc: 'Cebola desidratada, alho granulado, pimentão vermelho, tomate seco, mostarda, alecrim, cebolinha, manjericão e louro. Para arroz, refogados, carnes e sopas.', price: 5.50, img: 'img/pega_marido.jpg' },
      { name: 'Páprica Doce (100g)', desc: 'Pimentões secos moídos que adicionam cor suave e sabor delicado a carnes, aves, peixes, sopas e molhos.', price: 4.00, img: 'img/paprica_doce.jpg' },
      { name: 'Páprica Defumada (100g)', desc: 'Pimentões defumados moídos que adicionam sabor e aroma defumado a carnes, aves, peixes e molhos.', price: 4.50, img: 'img/paprica_defumada.jpg' },
      { name: 'Páprica Picante (100g)', desc: 'Pimentões secos com adição de pimenta, para dar toque picante e cor a pratos diversos.', price: 4.00, img: 'img/paprica_picante.jpg' },
      { name: 'Açafrão (100g)', desc: 'Também conhecido como cúrcuma, adiciona cor, sabor e propriedades benéficas. Usado em carnes, arroz, sopas e molhos.', price: 4.00, img: 'img/acafrao.jpg' },
      { name: 'Colorau Paraíba (100g)', desc: 'Colorau de coloração vibrante, usado em arroz, feijão, carnes e molhos para cor e sabor suave.', price: 4.00, img: 'img/colorau_paraiba.jpg' },
      { name: 'Colorau Tradicional (100g)', desc: 'Urucum em pó que adiciona cor avermelhada e sabor levemente terroso a pratos brasileiros.', price: 3.00, img: 'img/colorau_tradicional.jpg' },
      { name: 'Cominho Moído (100g)', desc: 'Especiaria versátil para carnes, legumes, ovos, feijão, lentilha, arroz, batatas e sopas.', price: 4.50, img: 'img/cominho_moido.jpg' },
      { name: 'Mix para Arroz (100g)', desc: 'Composto de cebola, alho e cenoura desidratados para dar sabor de refogado ao arroz e outros pratos.', price: 5.00, img: 'img/mix_para_arroz.jpg' },
      { name: 'Caldo de Galinha em Pó (menos sódio) (100g)', desc: 'Caldo em pó com menos sódio para substituir cubos, prático em sopas, cozidos e molhos.', price: 3.80, img: 'img/caldo_de_galinha.jpg' },
      { name: 'Tempero Tempera Tudo (100g)', desc: 'Mistura de especiarias para dar sabor a carnes, legumes, saladas, sopas e ovos.', price: 5.00, img: 'img/tempera_tudo.jpg' },
      { name: 'Fumaça em pó (100g)', desc: 'Condimento para conferir sabor defumado a carnes, molhos, sopas e até preparações doces como molho barbecue.', price: 6.00, img: 'img/fumaca.jpg' },
      { name: 'Pimenta-do-reino Moída (100g)', desc: 'Pimenta do reino moída para sabor intenso.', price: 6.00, img: 'img/pimenta_do_reino_moida.jpg' },
      { name: 'Alho Desidratado (100g)', desc: 'Indicado em todas as preparações culinárias em substituição ao alho cru. Refogados em geral, legumes, temperos para caldos, sopas e molhos.', price: 5.00, img: 'img/alho_desidratado.jpg' },
      { name: 'Cebola em Flocos Desidratada (100g)', desc: 'Ingrediente versátil que pode ser usado em diversas receitas, tanto para sabor quanto para textura.', price: 5.50, img: 'img/cebola_em_flocos_desidratada.jpg' },
      { name: 'Pimenta Calabresa (100g)', desc: 'Muito usada para adicionar sabor picante e aroma em carnes, peixes, sopas e molhos.', price: 5.99, img: 'img/pimenta_calabresa.jpg' },
      { name: 'Sal Rosa Fino do Himalaia (100g)', desc: 'Sal puro e rico em minerais, ideal para uso diário e finalização gourmet.', price: 2.00, img: 'img/sal_rosa_fino_do_himalaia.jpg' },
      { name: 'Sal Rosa Grosso do Himalaia (100g)', desc: 'Perfeito para churrascos, substituto saudável do sal grosso comum.', price: 2.00, img: 'img/sal_rosa_grosso_do_himalaia.jpg' },
      { name: 'Sal Marinho (100g)', desc: 'Extraído da evaporação da água do mar, preserva minerais e nutrientes.', price: 2.00, img: 'img/sal_marinho.jpg' },
      { name: 'Tempero Fit Frango (100g)', desc: 'Mix sem sódio com páprica, alho, cebola, cúrcuma, ervas e especiarias.', price: 5.00, img: 'img/tempero_fit_frango.jpg' },
      { name: 'Tempero Fit Completo (100g)', desc: 'Mix saudável sem conservantes, ideal para carnes, legumes, peixes e sopas.', price: 5.00, img: 'img/tempero_fit_completo.jpg' },
      { name: 'Tempero Realce (100g)', desc: 'Ideal para carnes, arroz, legumes e ensopados.', price: 4.50, img: 'img/tempero_realce.jpg' },
      { name: 'Caldo de Carne em Pó (100g)', desc: 'Prático e saboroso, substitui o caldo em cubos em sopas e carnes.', price: 3.00, img: 'img/caldo_de_carne_em_po.jpg' },
      { name: 'Caldo de Costela em Pó (100g)', desc: 'Versátil para sopas, caldos, molhos e carnes.', price: 3.00, img: 'img/caldo_de_costela_em_po.jpg' },
      { name: 'Bacon Desidratado (100g)', desc: 'Sabor defumado autêntico, ótimo em feijão, sopas, farofas e hambúrgueres.', price: 5.50, img: 'img/bacon_desidratado.jpg' },
      { name: 'Pimenta do Reino Preta em Grãos (100g)', desc: 'Grãos inteiros com aroma intenso, ideal para moer na hora.', price: 8.00, img: 'img/pimenta_do_reino_graos.jpg' },
      { name: 'Pimenta do Reino Preta Moída (100g)', desc: 'Versátil, dá toque picante e marcante em carnes, molhos e sopas.', price: 8.00, img: 'img/pimenta_do_reino_preta_moida.jpg' },
      { name: 'Mostarda em Grãos (100g)', desc: 'Sementes amarelas com sabor marcante, usadas em molhos, carnes e chás.', price: 7.00, img: 'img/mostarda_em_graos.jpg' },
      { name: 'Tempero Master Chef (100g)', desc: 'Seleção de especiarias para sabor intenso e gourmet.', price: 5.00, img: 'img/masterchef.jpg' },
      { name: 'Tempero Molho Tártaro (100g)', desc: 'Blend com cebola, cenoura, pimentão e ervas, ótimo para molhos e peixes.', price: 4.50, img: 'img/molho_tartaro.jpg' },
      { name: 'Orégano (100g)', desc: 'Erva aromática clássica para massas, pizzas, carnes e molhos.', price: 5.99, img: 'img/oregano.jpg' },
      { name: 'Tempero Cebola, Alho e Salsa (100g)', desc: 'Combinação versátil para carnes, aves, arroz, feijão e sopas.', price: 4.99, img: 'img/alho_salsa_cebola.jpg' },
      { name: 'Salsa Desidratada (100g)', desc: 'Prática para sopas, molhos, carnes, saladas e peixes.', price: 4.00, img: 'img/salsa_desidratada.jpg' },
      { name: 'Alho Frito Granulado (100g)', desc: 'Adiciona crocância e sabor em pratos, ótimo para finalizar receitas.', price: 5.00, img: 'img/alho_frito_granulado.jpg' },
    ],

    ervas: [
      { name: 'Erva Doce', desc: 'É conhecida por suas propriedades digestivas, antiespasmódicas e carminativas, ajudando a aliviar gases, cólicas e prisão de ventre. Também tem efeitos calmantes e antioxidantes, sendo utilizada em chás, sopas e saladas. ', price: 4.50, img: 'img/erva-doce.jpg' },
    ],
  };

  /* persistence */
  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(i => ({ id: String(i.id || ''), name: String(i.name || ''), price: Number(i.price) || 0, qty: Math.max(0, Math.floor(Number(i.qty) || 0)) })).filter(i => i.qty > 0);
    } catch (e) { console.warn('Erro ao carregar carrinho', e); return []; }
  }
  function saveCart() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { console.warn('Erro ao salvar carrinho', e); } }

  /* utils */
  function slugify(str) { return String(str||'').toLowerCase().normalize?.('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^\w\s-]/g,'').trim().replace(/\s+/g,'-'); }
  function esc(s){ return String(s).replace(/"/g,'&quot;'); }

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
    ['temperos','ervas'].forEach(cat => {
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
    const cartEl = document.getElementById('cart');
    if (!cartItems || !cartEl) return;

    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    cartItems.innerHTML = '';
    let total = 0;

    if (!isMobile || cartEl.classList.contains('open')) {
      // Modo desktop ou mobile expandido
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
    } else {
      // Mobile fechado: mostrar apenas resumo
      const li = document.createElement('li');
      li.textContent = `${cart.reduce((acc,i)=>acc+i.qty,0)} itens no carrinho`;
      cartItems.appendChild(li);
    }

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
  window.addToCart = addToCart;

  function changeQty(id, delta) {
    const idx = cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx,1);
    renderCart();
  }

  /* attach product buttons */
  document.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const { id, name, price, action } = btn.dataset;
    if (action==='inc') changeQty(id,1);
    else if (action==='dec') changeQty(id,-1);
    else addToCart(id,name,Number(price));
  });

  /* persist cart */
  cart = loadCart();
  renderProdutos();
  renderCart();

  /* scroll carousel */
  window.scrollCarousel = function(carouselId, delta){
    const el = document.getElementById(carouselId);
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }

  /* cart drag functionality */
  function setupCartDrag() {
    const cartEl = document.getElementById('cart');
    if (!cartEl) return;

    let isDragging = false;
    let startX, startY, initialX, initialY;

    cartEl.addEventListener('mousedown', (e) => {
      if (window.innerWidth <= 768) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = cartEl.offsetLeft;
      initialY = cartEl.offsetTop;
      cartEl.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      cartEl.style.left = `${initialX + dx}px`;
      cartEl.style.top = `${initialY + dy}px`;
      cartEl.style.right = 'auto';
      cartEl.style.bottom = 'auto';
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) { isDragging = false; cartEl.style.cursor = 'grab'; }
    });
  }
  setupCartDrag();

  /* cart toggle mobile */
  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle){
    cartToggle.addEventListener('click', ()=>{
      const cartEl = document.getElementById('cart');
      cartEl.classList.toggle('open');
      renderCart();
    });
  }

  /* send to WhatsApp */
  window.sendToWhatsApp = function(){
    if (!cart.length) return alert('Carrinho vazio!');
    
    // Separar ervas de temperos
    const ervas = [];
    const temperos = [];
    
    cart.forEach(item => {
      // Verificar se é uma erva (baseado no nome ou categoria)
      if (item.name.toLowerCase().includes('erva') || 
          produtos.ervas.some(erva => erva.name === item.name)) {
        ervas.push(item);
      } else {
        temperos.push(item);
      }
    });
    
    let msg = 'Olá, gostaria de fazer o pedido:%0A%0A';
    
    // Adicionar temperos
    if (temperos.length > 0) {
      msg += '🌶️ TEMPEROS: %0A';
      temperos.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalTemperos = temperos.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Temperos: R$ ${subtotalTemperos}%0A%0A`;
    }
    
    // Adicionar ervas
    if (ervas.length > 0) {
      msg += '🌿 ERVAS:%0A';
      ervas.forEach(item => {
        msg += `- ${item.name} x${item.qty} = R$ ${(item.price * item.qty).toFixed(2)}%0A`;
      });
      const subtotalErvas = ervas.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
      msg += `Subtotal Ervas: R$ ${subtotalErvas}%0A%0A`;
    }
    
    // Total geral
    const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0).toFixed(2);
    msg += `*TOTAL: R$ ${total}*`;
    
    const url = `https://wa.me/+5581991889242?text=${msg}`;
    window.open(url, '_blank');
  }
});

