(function () {
  'use strict';

  /* ---------- Catalogue ---------- */
  var PRODUCTS = {
    resin: {
      name: 'Shilajit Resin',
      sizes: [
        { id: '10g', label: '10 g', price: 1500, was: 1700 },
        { id: '20g', label: '20 g', price: 2900, was: 3100 },
        { id: '30g', label: '30 g', price: 4000, was: 4500 },
        { id: '50g', label: '50 g', price: 7100, was: 7300 },
        { id: '100g', label: '100 g', price: 12900, was: 14000 }
      ],
      defaultSize: '30g'
    },
    drops: {
      name: 'Shilajit Drops',
      sizes: [
        { id: '30ml', label: '30 ml', price: 2000, was: 2300 },
        { id: '60ml', label: '60 ml', price: 4000, was: 4600 }
      ],
      defaultSize: '60ml'
    },
    wholesale: {
      name: 'Shilajit Wholesale',
      sizes: [
        { id: '1kg', label: '1 kg', price: 95000, was: null },
        { id: '5kg', label: '5 kg', price: 475000, was: null }
      ],
      defaultSize: '1kg'
    }
  };

  var WHATSAPP = '923311116915';
  var STORAGE_KEY = 'oa-cart';

  function rs(n) {
    return 'Rs ' + n.toLocaleString('en-PK');
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- Cart state ---------- */
  var cart = [];
  try {
    var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(saved)) cart = saved.filter(function (i) {
      return PRODUCTS[i.product] && PRODUCTS[i.product].sizes.some(function (s) { return s.id === i.size; });
    });
  } catch (e) { cart = []; }

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
  }

  function sizeOf(productKey, sizeId) {
    return PRODUCTS[productKey].sizes.filter(function (s) { return s.id === sizeId; })[0];
  }

  function addToCart(productKey, sizeId, qty) {
    var existing = cart.filter(function (i) { return i.product === productKey && i.size === sizeId; })[0];
    if (existing) existing.qty += qty;
    else cart.push({ product: productKey, size: sizeId, qty: qty });
    persist();
    renderCart();
  }

  function updateQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    persist();
    renderCart();
  }

  function removeItem(index) {
    cart.splice(index, 1);
    persist();
    renderCart();
  }

  function cartTotal() {
    return cart.reduce(function (sum, i) { return sum + sizeOf(i.product, i.size).price * i.qty; }, 0);
  }

  function cartCount() {
    return cart.reduce(function (sum, i) { return sum + i.qty; }, 0);
  }

  /* ---------- Cart rendering ---------- */
  var itemsEl = $('#cartItems');
  var totalEl = $('#cartTotal');
  var countEl = $('#cartCount');
  var checkoutBtn = $('#checkoutBtn');

  function renderCart() {
    countEl.textContent = cartCount();
    totalEl.textContent = rs(cartTotal());
    itemsEl.innerHTML = '';

    if (!cart.length) {
      var empty = document.createElement('p');
      empty.className = 'cart-empty';
      empty.textContent = 'Your cart is empty. Choose a size above to add shilajit.';
      itemsEl.appendChild(empty);
      checkoutBtn.setAttribute('aria-disabled', 'true');
      checkoutBtn.href = '#products';
      checkoutBtn.removeAttribute('target');
      return;
    }

    cart.forEach(function (item, index) {
      var p = PRODUCTS[item.product];
      var s = sizeOf(item.product, item.size);
      var row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML =
        '<span class="cart-item-name">' + p.name + '</span>' +
        '<span class="cart-item-price">' + rs(s.price * item.qty) + '</span>' +
        '<span class="cart-item-size">' + s.label + ' at ' + rs(s.price) + ' each</span>' +
        '<div class="cart-item-controls">' +
          '<div class="qty"><button type="button" data-d="-1" aria-label="Decrease">&minus;</button><output>' + item.qty + '</output><button type="button" data-d="1" aria-label="Increase">+</button></div>' +
          '<button type="button" class="remove">Remove</button>' +
        '</div>';
      $all('[data-d]', row).forEach(function (b) {
        b.addEventListener('click', function () { updateQty(index, parseInt(b.getAttribute('data-d'), 10)); });
      });
      $('.remove', row).addEventListener('click', function () { removeItem(index); });
      itemsEl.appendChild(row);
    });

    var lines = cart.map(function (i) {
      var s = sizeOf(i.product, i.size);
      return '- ' + PRODUCTS[i.product].name + ' ' + s.label + ' x ' + i.qty + ' = ' + rs(s.price * i.qty);
    });
    var msg = 'Hi Organic Aprico, I would like to order:\n' + lines.join('\n') + '\nSubtotal: ' + rs(cartTotal());
    checkoutBtn.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    checkoutBtn.setAttribute('target', '_blank');
    checkoutBtn.removeAttribute('aria-disabled');
  }

  /* ---------- Drawer ---------- */
  var drawer = $('#drawer');
  var backdrop = $('#drawerBackdrop');
  var lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    backdrop.hidden = false;
    requestAnimationFrame(function () { backdrop.classList.add('show'); drawer.classList.add('open'); });
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    $('#cartClose').focus();
  }

  function closeDrawer() {
    backdrop.classList.remove('show');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    setTimeout(function () { backdrop.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }

  $('#cartOpen').addEventListener('click', openDrawer);
  $('#cartClose').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
  checkoutBtn.addEventListener('click', function (e) {
    if (checkoutBtn.getAttribute('aria-disabled') === 'true') { e.preventDefault(); closeDrawer(); }
  });

  /* ---------- Toast ---------- */
  var toast = $('#toast');
  var toastTimer;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ---------- Product panels ---------- */
  $all('.product').forEach(function (panel) {
    var key = panel.getAttribute('data-product');
    var p = PRODUCTS[key];
    var sizesEl = $('.sizes', panel);
    var nowEl = $('.price-now', panel);
    var wasEl = $('.price-was', panel);
    var qtyOut = $('.qty output', panel);
    var addBtn = $('.add-btn', panel);
    var selected = p.defaultSize;
    var qty = 1;

    function paint() {
      $all('.size', sizesEl).forEach(function (b) {
        var on = b.getAttribute('data-size') === selected;
        b.setAttribute('aria-checked', on ? 'true' : 'false');
        b.tabIndex = on ? 0 : -1;
      });
      var s = sizeOf(key, selected);
      nowEl.textContent = rs(s.price);
      wasEl.textContent = s.was ? rs(s.was) : '';
      qtyOut.textContent = qty;
    }

    p.sizes.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'size';
      b.setAttribute('role', 'radio');
      b.setAttribute('data-size', s.id);
      b.textContent = s.label;
      b.addEventListener('click', function () { selected = s.id; paint(); });
      sizesEl.appendChild(b);
    });

    sizesEl.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var idx = p.sizes.findIndex(function (s) { return s.id === selected; });
      idx = (idx + (e.key === 'ArrowRight' ? 1 : -1) + p.sizes.length) % p.sizes.length;
      selected = p.sizes[idx].id;
      paint();
      $('.size[data-size="' + selected + '"]', sizesEl).focus();
    });

    $all('[data-qty]', panel).forEach(function (b) {
      b.addEventListener('click', function () {
        qty = Math.max(1, qty + parseInt(b.getAttribute('data-qty'), 10));
        paint();
      });
    });

    addBtn.addEventListener('click', function () {
      addToCart(key, selected, qty);
      var s = sizeOf(key, selected);
      showToast('Added ' + qty + ' x ' + p.name + ' ' + s.label + ' to cart');
      addBtn.textContent = 'Added';
      addBtn.classList.add('added');
      setTimeout(function () { addBtn.textContent = 'Add to cart'; addBtn.classList.remove('added'); }, 1400);
      qty = 1;
      paint();
    });

    paint();
  });

  renderCart();

  /* ---------- Nav on scroll ---------- */
  var nav = $('#nav');
  function onScrollNav() { nav.classList.toggle('scrolled', window.scrollY > 24); }
  onScrollNav();

  /* ---------- Altitude rail ---------- */
  var altMarker = $('#altMarker');
  var altRead = $('#altRead');
  var TOP_FT = 17000, BOTTOM_FT = 712;
  function onScrollAlt() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    altMarker.style.top = (t * 100) + '%';
    var ft = Math.round(TOP_FT - (TOP_FT - BOTTOM_FT) * t);
    altRead.textContent = ft.toLocaleString('en-US') + ' ft above sea level';
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScrollNav(); onScrollAlt(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', onScrollAlt);
  onScrollAlt();

  /* ---------- Purification stage tracker ---------- */
  var stages = $all('.stage');
  var stageCurrent = $('#stageCurrent');
  if ('IntersectionObserver' in window && stages.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        stages.forEach(function (s) { s.classList.remove('active'); });
        entry.target.classList.add('active');
        stageCurrent.textContent = stages.indexOf(entry.target) + 1;
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    stages.forEach(function (s) { io.observe(s); });
    stages[0].classList.add('active');
  }

  /* ---------- Newsletter ---------- */
  var form = $('#newsletter');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var note = $('#newsletterNote');
    note.textContent = 'Thanks. Your 10% code is on its way to ' + $('#email').value + '.';
    form.reset();
  });

  /* ---------- Misc ---------- */
  $('#year').textContent = new Date().getFullYear();

  window.addEventListener('load', function () {
    requestAnimationFrame(function () { document.body.classList.add('ready'); });
  });
  setTimeout(function () { document.body.classList.add('ready'); }, 1200);
})();
