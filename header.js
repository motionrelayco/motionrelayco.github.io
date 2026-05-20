(function() {
  // Inject header HTML
  const headerHTML = `
  <header id="site-header" style="
    position:fixed;top:0;left:0;right:0;z-index:9000;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 56px;height:68px;
    background:rgba(10,10,10,0);
    transition:background .4s ease,border-bottom .4s ease;
    font-family:'Playfair Display',Georgia,serif;
    box-sizing:border-box;
  ">
    <a href="index.html" id="site-brand" style="
      text-decoration:none;
      position:relative;z-index:9001;
      display:flex;flex-direction:column;align-items:flex-start;line-height:1;
      gap:0;
    ">
      <span id="brand-motion" style="
        font-family:'Playfair Display',Georgia,serif;
        font-style:italic;font-weight:700;
        font-size:1.45rem;letter-spacing:-.02em;
        color:#f9f8f6;line-height:.95;
        transition:color .3s ease;
        white-space:nowrap;
      ">Motion</span>
      <span style="display:flex;align-items:center;width:100%;gap:6px;margin-top:3px;">
        <span id="brand-line" style="flex:1;height:1px;background:rgba(255,255,255,.25);transition:background .3s ease;"></span>
        <span id="brand-relay" style="
          font-family:'DM Sans',sans-serif;
          font-weight:300;font-size:.42rem;
          letter-spacing:.28em;text-transform:uppercase;
          color:rgba(255,255,255,.6);white-space:nowrap;
          transition:color .3s ease;
          flex-shrink:0;
        ">Relay</span>
      </span>
    </a>
    <nav style="display:flex;gap:28px;align-items:center;margin-left:auto;">
      <a href="index.html#intro" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">How It Works.</a>
      <a href="services.html" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Services.</a>
      <a href="index.html#pricing" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Pricing.</a>
      <a href="contact.html" class="site-nav-link" style="
        font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:700;
        color:rgba(255,255,255,.65);letter-spacing:.04em;
        text-decoration:none;padding-bottom:2px;
        border-bottom:1px solid transparent;
        transition:color .2s,border-color .2s;
        position:relative;z-index:9001;
        white-space:nowrap;
      ">Book a Call.</a>
    </nav>
  </header>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const hdr   = document.getElementById('site-header');
  const brand = document.getElementById('site-brand');
  const motion = document.getElementById('brand-motion');
  const relay  = document.getElementById('brand-relay');
  const line   = document.getElementById('brand-line');
  const links  = document.querySelectorAll('.site-nav-link');

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
      hdr.style.background = 'rgba(10,10,10,.96)';
      hdr.style.borderBottom = '1px solid #1c1c1c';
      hdr.style.backdropFilter = 'blur(12px)';
      if(motion) motion.style.color = '#f5f5f0';
      if(relay)  relay.style.color  = 'rgba(245,245,240,.5)';
      if(line)   line.style.background = 'rgba(245,245,240,.2)';
      links.forEach(a => {
        const isActive = a.getAttribute('href') === page;
        a.style.color = isActive ? '#f5f5f0' : 'rgba(245,245,240,.55)';
        a.style.borderBottomColor = isActive ? 'rgba(61,122,88,.8)' : 'transparent';
      });
    } else {
      hdr.style.background = 'rgba(10,10,10,0)';
      hdr.style.borderBottom = 'none';
      hdr.style.backdropFilter = 'none';
      if(motion) motion.style.color = '#f5f5f0';
      if(relay)  relay.style.color  = 'rgba(245,245,240,.6)';
      if(line)   line.style.background = 'rgba(245,245,240,.25)';
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
      a.style.color = '#ffffff';
      a.style.borderBottomColor = '#3d7a58';
    });
    a.addEventListener('mouseleave', () => {
      const isActive = a.getAttribute('href') === page;
      if (scrolled) {
        a.style.color = isActive ? '#f5f5f0' : 'rgba(245,245,240,.55)';
        a.style.borderBottomColor = isActive ? 'rgba(61,122,88,.8)' : 'transparent';
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
