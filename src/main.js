import './style.css';

const state = { cart: [], currentPage: 'home', selectedSizes: { almond: '125გ', cashew: '125გ' } };
const prices = { '50გ': 4.50, '125გ': 9.90, '250გ': 17.50 };
const sizeLabels = { '50გ': 'მცირე', '125გ': 'საშუალო', '250გ': 'დიდი' };

function navigate(page) { state.currentPage = page; window.history.pushState({ page }, '', page === 'home' ? '/' : `/${page}`); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('popstate', (e) => { state.currentPage = e.state?.page || getPageFromPath(); render(); });
function getPageFromPath() { const p = window.location.pathname.replace(/^\//, ''); return p || 'home'; }

function addToCart(product, size) {
  const ex = state.cart.find(i => i.product === product && i.size === size);
  if (ex) ex.qty++; else state.cart.push({ product, size, price: prices[size], qty: 1 });
  render(); setTimeout(() => document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' }), 100);
}
function removeFromCart(i) { state.cart.splice(i, 1); render(); }
function getCartTotal() { return state.cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2); }
function getCartCount() { return state.cart.reduce((s, i) => s + i.qty, 0); }

const ico = {
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
};

const waveTop = `<div class="wave-divider"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,100 720,0 1080,50 C1260,70 1380,30 1440,40 L1440,0 L0,0 Z" fill="#f7f4f0"/></svg></div>`;
const waveGold = `<div class="footer-wave"><svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,0 C240,80 480,20 720,60 C960,100 1200,30 1440,70 L1440,100 L0,100 Z" fill="#e8a832"/></svg></div>`;

function Navbar() {
  const c = getCartCount();
  return `<nav class="navbar" id="navbar">
    <a href="/" class="nav-brand" data-nav="home"><img src="/images/logo.png" alt="Candy Nuts Logo"> CANDY NUTS</a>
    <div class="nav-links">
      <a href="/" data-nav="home" class="${state.currentPage === 'home' ? 'active' : ''}">მთავარი</a>
      <a href="/almonds" data-nav="almonds" class="${state.currentPage === 'almonds' ? 'active' : ''}">ნუში</a>
      <a href="/cashews" data-nav="cashews" class="${state.currentPage === 'cashews' ? 'active' : ''}">ქეშიუ</a>
      <a href="/#shop" data-nav="home" data-scroll="shop">მაღაზია</a>
    </div>
    <button class="mobile-menu-btn" id="mobileMenuBtn"><span></span><span></span><span></span></button>
  </nav>`;
}



function Hero() {
  return `<section class="hero" id="hero">
    <div class="hero-bg-text">CANDY NUTS</div>
    <div class="hero-num">01</div>
    <p class="hero-tag">მოხალული <span>·</span> კარამელიზირებული <span>·</span> ნატურალური</p>
    <h1>პრემიუმ ხარისხის<br>თხილეული.</h1>
    <p>Candy Nuts — ხელით შერჩეული ნუში და ქეშიუ, ნაზად მოხალული და კარამელიზირებული. ნატურალური ინგრედიენტები და სუფთა გემო.</p>
    <div class="hero-buttons">
      <a href="/#shop" class="btn-primary" data-nav="home" data-scroll="shop">${ico.cart} შეუკვეთე ახლავე</a>
      <a href="/almonds" class="btn-secondary" data-nav="almonds">გაიცანი პროდუქცია</a>
    </div>
  </section>`;
}

function Products() {
  return `<section class="products-section fade-in">
    <div class="products-grid">
      <a href="/almonds" class="product-card" data-nav="almonds">
        <img src="/images/almond-package.png" alt="ნუში" class="product-card-img" loading="lazy"/>
        <div class="product-card-info"><div class="product-card-num">0 1</div><h3>ნუში</h3><p>მოხალული და კარამელიზებული</p></div>
      </a>
      <a href="/cashews" class="product-card" data-nav="cashews">
        <img src="/images/cashew-package.png" alt="ქეშიუ" class="product-card-img" loading="lazy"/>
        <div class="product-card-info"><div class="product-card-num">0 2</div><h3>ქეშიუ</h3><p>მოხალული და კარამელიზებული</p></div>
      </a>
    </div>
  </section>`;
}

function Partners() {
  const p = ['Wendy\'s', 'Badagi', 'Subway', 'Agrohub', 'Dunkin\''];
  const items = [...p, ...p, ...p, ...p].map(n => `<span class="marquee-item">${n}</span>`).join('');
  return `${waveTop.replace('#f7f4f0', '#3a1f0d')}
  <section class="partners-section fade-in"><div class="partners-label">ჩვენი პარტნიორები</div><div class="marquee-track">${items}</div></section>`;
}

function Story() {
  return `<section class="story-section fade-in" id="story">
    <div class="story-label">ჩვენი ისტორია</div>
    <h2>ნატურალური. <span class="highlight">გემრიელი.</span><br>ქართული.</h2>
    <p>ჩვენ ვამუშავებთ მხოლოდ საუკეთესო ნედლეულს — ვხალავთ ნაზად, ვკარამელიზებთ მცირე პორციებად და ვფუთავთ ხელით.</p>
    <div class="story-features">
      <div class="story-feature"><div class="story-feature-icon">🌿</div><h4>100% ნატურალური</h4><p>კონსერვანტების გარეშე.</p></div>
      <div class="story-feature"><div class="story-feature-icon">🤲</div><h4>ხელით დაფასოებული</h4><p>ყოველი პაკეტი — ყურადღებით.</p></div>
      <div class="story-feature"><div class="story-feature-icon">🇬🇪</div><h4>ლოკალური წარმოება</h4><p>ქართული, საუკეთესო ხარისხის.</p></div>
    </div>
  </section>`;
}

function ShopCard(product, name, desc, img) {
  const sel = state.selectedSizes[product], price = prices[sel];
  return `<div class="shop-card">
    <div class="shop-card-badge">Candy Nuts</div><h3>${name}</h3><p class="shop-desc">${desc}</p>
    <img src="${img}" alt="${name}" class="shop-card-img" loading="lazy"/>
    <p class="shop-desc">აირჩიე გრამაჟი</p>
    <div class="size-selector">${['50გ', '125გ', '250გ'].map(s => `<button class="size-btn ${s === sel ? 'active' : ''}" data-product="${product}" data-size="${s}"><span class="size-weight">${s}</span><span class="size-price">${prices[s].toFixed(2)} ₾</span></button>`).join('')}</div>
    <div class="shop-card-footer">
      <div><div class="price-label">ფასი</div><div class="price-value">${price.toFixed(2)} <span class="price-currency">₾</span></div></div>
      <button class="btn-add-cart" data-add-product="${product}" data-add-size="${sel}">${ico.cart} კალათაში დამატება</button>
    </div>
  </div>`;
}

function Shop() {
  return `<section class="shop-section fade-in" id="shop">
    <div class="shop-header"><div class="section-label">მაღაზია</div><h2>აირჩიე შენი გემო</h2><p>აირჩიე პროდუქტი და სასურველი გრამაჟი — 50გ, 125გ ან 250გ — და დაამატე კალათაში.</p></div>
    <div class="shop-grid">${ShopCard('almond', 'ნუში', 'მოხალული და კარამელიზებული', '/images/almond-package.png')}${ShopCard('cashew', 'ქეშიუ', 'მოხალული და კარამელიზებული', '/images/cashew-package.png')}</div>
  </section>`;
}

function Cart() {
  const names = { almond: 'ნუში', cashew: 'ქეშიუ' }, imgs = { almond: '/images/almond-package.png', cashew: '/images/cashew-package.png' };
  const items = state.cart.length === 0
    ? `<div class="cart-empty">კალათა ცარიელია. აირჩიე პროდუქტი ზემოდან.</div>`
    : `<div class="cart-items">${state.cart.map((it, i) => `<div class="cart-item"><div class="cart-item-info"><img src="${imgs[it.product]}" alt="${names[it.product]}" class="cart-item-img"/><div><div class="cart-item-name">${names[it.product]}</div><div class="cart-item-size">${it.size} × ${it.qty}</div></div></div><div class="cart-item-price">${(it.price * it.qty).toFixed(2)} ₾</div><button class="cart-item-remove" data-remove="${i}">${ico.x}</button></div>`).join('')}<div class="cart-total"><span class="cart-total-label">ჯამი</span><span class="cart-total-value">${getCartTotal()} ₾</span></div></div>`;
  return `<section class="cart-section fade-in" id="cart"><div class="cart-box"><h3>შენი კალათა</h3>${items}</div></section>`;
}

function CTA() {
  return `<section class="cta-section fade-in"><h2>გაინტერესებს?<br>შეუკვეთე ახლავე</h2>
    <a href="/#shop" class="btn-primary" data-nav="home" data-scroll="shop">${ico.cart} შეუკვეთე</a></section>`;
}

function Footer() {
  return `${waveGold}<footer class="footer">© 2026 Candy Nuts. ყველა უფლება დაცულია.</footer>`;
}

function DetailPage(page) {
  const d = {
    almonds: { tag: 'პროდუქტი', title: 'ნუში — <span class="highlight">ნაზად მოხალული</span>', desc: 'ჩვენი ნუში არის ხელით შერჩეული და ნაზად მოხალული, შემდეგ კი დაფარული ბუნებრივი კარამელის თხელი, მბრწყინავი ფენით. ყოველი მარცვალი ინარჩუნებს კრუნჩხვას შიგნით და გადასაყვარ ტკბილ გემოს გარეთ.', img: '/images/almond-package.png' },
    cashews: { tag: 'პროდუქტი', title: 'ქეშიუ — <span class="highlight">კარამელიზებული</span>', desc: 'ჩვენი ქეშიუ არის ხელით შერჩეული და ნაზად მოხალული, შემდეგ კი დაფარული ბუნებრივი კარამელის თხელი ფენით. კრემისებრი ტექსტურა შეხამებული ტკბილ კარამელთან.', img: '/images/cashew-package.png' },
  }[page];
  return `${Navbar()}<section class="product-detail">
    <div class="product-detail-content">
      <div class="product-detail-tag">${d.tag}</div><h1>${d.title}</h1><p>${d.desc}</p>
      <div class="detail-sizes">${['50გ', '125გ', '250გ'].map(s => `<button class="detail-size-btn ${s === '125გ' ? 'active' : ''}" data-detail-size="${s}"><span class="size-weight">${s}</span><span class="size-label">${sizeLabels[s]}</span></button>`).join('')}</div>
      <a href="/#shop" class="btn-choose-size" data-nav="home" data-scroll="shop">აირჩიე გრამაჟი ${ico.arrow}</a>
    </div>
    <div class="product-detail-image"><img src="${d.img}" alt="${d.tag}" /></div>
  </section>${Footer()}`;
}

function render() {
  const app = document.getElementById('app');
  if (state.currentPage === 'almonds' || state.currentPage === 'cashews') {
    app.innerHTML = DetailPage(state.currentPage);
  } else {
    app.innerHTML = `${Navbar()}${Hero()}${Products()}${Partners()}${Story()}${Shop()}${Cart()}${CTA()}${Footer()}`;
  }
  bindEvents(); initObserver(); initNavScroll();
}

function bindEvents() {
  document.querySelectorAll('[data-nav]').forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    const page = el.dataset.nav, scroll = el.dataset.scroll;
    if (page !== state.currentPage) { navigate(page); if (scroll) setTimeout(() => document.getElementById(scroll)?.scrollIntoView({ behavior: 'smooth' }), 200); }
    else if (scroll) document.getElementById(scroll)?.scrollIntoView({ behavior: 'smooth' });
  }));
  document.querySelectorAll('.size-btn').forEach(b => b.addEventListener('click', () => { state.selectedSizes[b.dataset.product] = b.dataset.size; render(); }));
  document.querySelectorAll('[data-add-product]').forEach(b => b.addEventListener('click', () => addToCart(b.dataset.addProduct, b.dataset.addSize)));
  document.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.remove))));
  document.querySelectorAll('.detail-size-btn').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('.detail-size-btn').forEach(x => x.classList.remove('active')); b.classList.add('active'); }));
}

function initObserver() {
  const obs = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }), { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const h = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', h, { passive: true }); h();
}

state.currentPage = getPageFromPath();
render();
