/* Hifza Hanif creative portfolio — small, accessible interactions. */
(() => {
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    };
    toggle.addEventListener('click', () => {
      const open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
  }

  const filters = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.brand-card[data-category]'));
  const status = document.querySelector('.filter-status');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let shown = 0;
    filters.forEach(other => {
      const selected = other === button;
      other.classList.toggle('is-active', selected);
      other.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter);
      card.hidden = !matches;
      if (matches) shown++;
    });
    if (status) status.textContent = filter === 'all'
      ? `Showing all ${shown} brands`
      : `Showing ${shown} ${shown === 1 ? 'brand' : 'brands'}`;
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // A thin, unobtrusive reading progress bar.
  const progressBar = document.querySelector('.scroll-progress span');
  const updateScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
    document.body.classList.toggle('scrolled', window.scrollY > 25);
  };
  if (progressBar) {
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();
  }

  // Only one Taara reel plays at a time.
  const videos = [...document.querySelectorAll('.reels-grid video')];
  videos.forEach(current => current.addEventListener('play', () => {
    videos.forEach(other => { if (other !== current && !other.paused) other.pause(); });
  }));
})();


/* THK Glow: local review filtering + accessible screenshot preview */
(() => {
 const buttons=[...document.querySelectorAll('[data-review-filter]')];
 const cards=[...document.querySelectorAll('.thk-review-card')];
 const status=document.querySelector('.thk-review-count');
 buttons.forEach(button=>button.addEventListener('click',()=>{
   const type=button.dataset.reviewFilter;
   buttons.forEach(b=>{const on=b===button;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});
   let count=0;
   cards.forEach(card=>{const show=type==='all'||card.dataset.reviewType===type;card.hidden=!show;if(show)count++;});
   if(status)status.textContent=`Showing ${count} feedback screenshot${count===1?'':'s'}`;
 }));
 const modal=document.getElementById('thk-lightbox');
 if(!modal)return;
 const modalImg=modal.querySelector('img');
 const close=modal.querySelector('.thk-lightbox-close');
 let previousFocus=null;
 const dismiss=()=>{modal.hidden=true;modalImg.removeAttribute('src');document.body.style.overflow='';if(previousFocus)previousFocus.focus();};
 document.querySelectorAll('[data-review-image]').forEach(btn=>btn.addEventListener('click',()=>{
   previousFocus=btn;
   modalImg.src=btn.dataset.reviewImage;
   modalImg.alt=btn.dataset.reviewAlt||'Customer review screenshot';
   modal.hidden=false;
   document.body.style.overflow='hidden';
   close.focus();
 }));
 close?.addEventListener('click',dismiss);
 modal.addEventListener('click',e=>{if(e.target===modal)dismiss();});
 document.addEventListener('keydown',e=>{
   if(modal.hidden)return;
   if(e.key==='Escape')dismiss();
   if(e.key==='Tab'){e.preventDefault();close.focus();}
 });
})();
