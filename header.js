const header = `
<header style="
  position:fixed;top:0;left:0;right:0;z-index:600;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 56px;height:68px;
  background:rgba(0,0,0,0);
  transition:background .4s ease, border-bottom .4s ease;
  font-family:'Playfair Display',Georgia,serif;
">
  <a href="index.html" class="brand-link" style="
    font-size:1.1rem;font-weight:700;color:#f9f8f6;
    text-decoration:none;letter-spacing:.02em;
    pointer-events:all;position:relative;z-index:601;
    transition:color .4s ease;
  ">Motion Relay</a>
  <nav style="display:flex;gap:32px;align-items:center;">
    <a href="index.html" class="nav-link" style="
      font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;
      color:rgba(255,255,255,.65);letter-spacing:.02em;text-decoration:none;
      padding-bottom:3px;border-bottom:1px solid transparent;
      transition:color .25s,border-color .25s;
      pointer-events:all;position:relative;z-index:601;
    ">Home.</a>
    <a href="portfolio.html" class="nav-link" style="
      font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;
      color:rgba(255,255,255,.65);letter-spacing:.02em;text-decoration:none;
      padding-bottom:3px;border-bottom:1px solid transparent;
      transition:color .25s,border-color .25s;
      pointer-events:all;position:relative;z-index:601;
    ">Portfolio.</a>
    <a href="contact.html" class="nav-link" style="
      font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;
      color:rgba(255,255,255,.65);letter-spacing:.02em;text-decoration:none;
      padding-bottom:3px;border-bottom:1px solid transparent;
      transition:color .25s,border-color .25s;
      pointer-events:all;position:relative;z-index:601;
    ">Contact.</a>
  </nav>
</header>`;

document.body.insertAdjacentHTML('afterbegin', header);

// Grab injected header and links
const hdr = document.body.querySelector('header');
const brand = hdr.querySelector('.brand-link');
const links = hdr.querySelectorAll('.nav-link');

// Mark active page
const page = location.pathname.split('/').pop() || 'index.html';
links.forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    a.style.color = '#ffffff';
    a.style.borderBottomColor = 'rgba(255,255,255,.5)';
  }
});

// Hover effects
links.forEach(a => {
  a.addEventListener('mouseenter', () => {
    if (!hdr.classList.contains('scrolled')) {
      a.style.color = '#ffffff';
      a.style.borderBottomColor = '#ffffff';
    } else {
      a.style.color = '#1a1a1a';
      a.style.borderBottomColor = '#1a1a1a';
    }
  });
  a.addEventListener('mouseleave', () => {
    const isActive = a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html');
    if (!hdr.classList.contains('scrolled')) {
      a.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,.65)';
      a.style.borderBottomColor = isActive ? 'rgba(255,255,255,.5)' : 'transparent';
    } else {
      a.style.color = isActive ? '#1a1a1a' : 'rgba(26,26,26,.6)';
      a.style.borderBottomColor = isActive ? 'rgba(26,26,26,.4)' : 'transparent';
    }
  });
});

// Scroll: dark hero → light background
let ticking = false;
function updateHeader() {
  const y = window.scrollY;
  const hero = document.getElementById('hero');
  const threshold = hero ? hero.offsetHeight - 100 : 80;

  if (y > threshold) {
    // scrolled into light section
    hdr.style.background = 'rgba(249,248,246,.96)';
    hdr.style.backdropFilter = 'blur(8px)';
    hdr.style.borderBottom = '1px solid #e0ddd8';
    brand.style.color = '#1a1a1a';
    links.forEach(a => {
      const isActive = a.getAttribute('href') === page;
      a.style.color = isActive ? '#1a1a1a' : 'rgba(26,26,26,.6)';
      a.style.borderBottomColor = isActive ? 'rgba(26,26,26,.4)' : 'transparent';
    });
    hdr.classList.add('scrolled');
  } else {
    // over dark hero
    hdr.style.background = 'rgba(0,0,0,0)';
    hdr.style.backdropFilter = 'none';
    hdr.style.borderBottom = 'none';
    brand.style.color = '#f9f8f6';
    links.forEach(a => {
      const isActive = a.getAttribute('href') === page;
      a.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,.65)';
      a.style.borderBottomColor = isActive ? 'rgba(255,255,255,.5)' : 'transparent';
    });
    hdr.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
}, { passive: true });

updateHeader();

// Mobile: shrink padding
if (window.innerWidth <= 900) {
  hdr.style.padding = '0 20px';
  hdr.querySelectorAll('.nav-link').forEach(a => {
    a.style.fontSize = '.65rem';
  });
}
