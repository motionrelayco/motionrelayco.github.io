(function() {
  // Inject header HTML
  const headerHTML = `
  <header id="site-header" style="
    position:fixed;top:0;left:0;right:0;z-index:9000;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 56px;height:68px;
    background:rgba(0,0,0,0);
    transition:background .4s ease,border-bottom .4s ease;
    font-family:'Playfair Display',Georgia,serif;
    box-sizing:border-box;
  ">
    <a href="index.html" id="site-brand" style="
      font-size:1.1rem;font-weight:700;color:#f9f8f6;
      text-decoration:none;letter-spacing:.02em;
      position:relative;z-index:9001;
      transition:color .3s ease;
      white-space:nowrap;
    ">Motion Relay</a>
    <nav style="display:flex;gap:28px;align-items:center;margin-left:auto;">
      <a href="index.html" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Home.</a>
      <a href="portfolio.html" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Portfolio.</a>
      <a href="contact.html" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Contact.</a>
    </nav>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const hdr   = document.getElementById('site-header');
  const brand = document.getElementById('site-brand');
  const links = document.querySelectorAll('.site-nav-link');

  // Mark active page
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === page) {
      a.style.color = '#ffffff';
      a.style.borderBottomColor = 'rgba(255,255,255,.5)';
    }
  });

  // Scroll: transparent over dark hero → light background
  let scrolled = false;
  function updateHeader() {
    const y = window.scrollY;
    const hero = document.getElementById('hero');
    const threshold = hero ? hero.offsetHeight - 80 : 80;
    const shouldScroll = y > threshold;

    if (shouldScroll === scrolled) return;
    scrolled = shouldScroll;

    if (scrolled) {
      hdr.style.background = 'rgba(249,248,246,.97)';
      hdr.style.borderBottom = '1px solid #e0ddd8';
      hdr.style.backdropFilter = 'blur(8px)';
      brand.style.color = '#1a1a1a';
      links.forEach(a => {
        const isActive = a.getAttribute('href') === page;
        a.style.color = isActive ? '#1a1a1a' : 'rgba(26,26,26,.55)';
        a.style.borderBottomColor = isActive ? 'rgba(26,26,26,.4)' : 'transparent';
      });
    } else {
      hdr.style.background = 'rgba(0,0,0,0)';
      hdr.style.borderBottom = 'none';
      hdr.style.backdropFilter = 'none';
      brand.style.color = '#f9f8f6';
      links.forEach(a => {
        const isActive = a.getAttribute('href') === page;
        a.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,.65)';
        a.style.borderBottomColor = isActive ? 'rgba(255,255,255,.5)' : 'transparent';
      });
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Hover effects
  links.forEach(a => {
    a.addEventListener('mouseenter', () => {
      a.style.color = scrolled ? '#1a1a1a' : '#ffffff';
      a.style.borderBottomColor = scrolled ? '#1a1a1a' : '#ffffff';
    });
    a.addEventListener('mouseleave', () => {
      const isActive = a.getAttribute('href') === page;
      if (scrolled) {
        a.style.color = isActive ? '#1a1a1a' : 'rgba(26,26,26,.55)';
        a.style.borderBottomColor = isActive ? 'rgba(26,26,26,.4)' : 'transparent';
      } else {
        a.style.color = isActive ? '#ffffff' : 'rgba(255,255,255,.65)';
        a.style.borderBottomColor = isActive ? 'rgba(255,255,255,.5)' : 'transparent';
      }
    });
  });

  // Mobile: shrink padding
  function onResize() {
    if (window.innerWidth <= 600) {
      hdr.style.padding = '0 16px';
      links.forEach(a => { a.style.fontSize = '.62rem'; a.style.gap = '16px'; });
    } else if (window.innerWidth <= 900) {
      hdr.style.padding = '0 24px';
      links.forEach(a => { a.style.fontSize = '.68rem'; });
    } else {
      hdr.style.padding = '0 56px';
      links.forEach(a => { a.style.fontSize = '.78rem'; });
    }
  }
  window.addEventListener('resize', onResize);
  onResize();

})();
