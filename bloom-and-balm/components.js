// ── Shared components injected into every page ─────────────

function getHead(title = 'Bloom & Balm', desc = 'Honest skincare reviews for Australian women.') {
  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="stylesheet" href="/style.css">
    <script src="/site.js"><\/script>
  `;
}

function renderNav(activePage = '') {
  const links = [
    { href: '/index.html', label: 'Home', id: 'home' },
    { href: '/blog/index.html', label: 'Reviews', id: 'reviews' },
    { href: '/spf-guide.html', label: 'SPF Guide', id: 'spf' },
    { href: '/korean-beauty.html', label: 'Korean Beauty', id: 'korean' },
    { href: '/routines.html', label: 'Routines', id: 'routines' },
    { href: '/about.html', label: 'About', id: 'about' },
  ];
  const navLinks = links.map(l =>
    `<li><a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a></li>`
  ).join('');
  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a>`
  ).join('');
  return `
<nav class="nav">
  <div class="container">
    <div class="nav__inner">
      <a href="/index.html" class="nav__logo"><span>Bloom</span> &amp; Balm</a>
      <ul class="nav__links">${navLinks}</ul>
      <button class="nav__burger" onclick="toggleMobileNav()" aria-label="Menu">Menu</button>
    </div>
  </div>
  <div class="nav__mobile" id="mobile-nav">${mobileLinks}</div>
</nav>`;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="footer__logo"><span>Bloom</span> &amp; Balm</div>
        <p class="footer__tagline">Honest skincare reviews from a Pakistani woman figuring out Australian skin.</p>
      </div>
      <div>
        <p class="footer__heading">Categories</p>
        <ul class="footer__links">
          <li><a href="/spf-guide.html">SPF &amp; Sun Protection</a></li>
          <li><a href="/korean-beauty.html">Korean Beauty</a></li>
          <li><a href="/moisturisers.html">Moisturisers</a></li>
          <li><a href="/routines.html">Routines</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__heading">Site</p>
        <ul class="footer__links">
          <li><a href="/about.html">About</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a href="/affiliate-disclosure.html">Affiliate Disclosure</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__heading">Follow</p>
        <div class="footer__social">
          <a href="#" class="footer__social-btn" aria-label="Instagram">IG</a>
          <a href="#" class="footer__social-btn" aria-label="Pinterest">P</a>
        </div>
      </div>
    </div>
  </div>
  <div class="footer__bottom container">
    <span>© ${new Date().getFullYear()} Bloom &amp; Balm. All rights reserved.</span>
    <a href="/affiliate-disclosure.html">Affiliate Disclosure</a>
  </div>
</footer>`;
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

function renderPostCard(post) {
  const href = `/blog/post.html?slug=${post.slug}`;
  const img = post.image
    ? `<img src="${post.image}" alt="${post.imageAlt || ''}" loading="lazy">`
    : `<div class="post-card__img-placeholder"></div>`;
  return `
<article class="post-card">
  <a href="${href}" class="post-card__img-wrap">${img}</a>
  <div class="post-card__body">
    ${post.category ? `<span class="post-card__cat">${post.category}</span>` : ''}
    <h3 class="post-card__title"><a href="${href}">${post.title}</a></h3>
    ${post.excerpt ? `<p class="post-card__excerpt">${post.excerpt}</p>` : ''}
    <a href="${href}" class="post-card__read">Read more →</a>
  </div>
</article>`;
}

function showToast(msg, type = '') {
  let t = document.getElementById('bb-toast');
  if (!t) { t = document.createElement('div'); t.id = 'bb-toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = `toast ${type ? 'toast--' + type : ''}`;
  requestAnimationFrame(() => { t.classList.add('show'); });
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

window.toggleMobileNav = toggleMobileNav;
window.showToast = showToast;
window.renderPostCard = renderPostCard;
window.renderNav = renderNav;
window.renderFooter = renderFooter;
