  const lines = [
    { text: "import self", type: "code" },
    { text: "print(self.name)", type: "code" },
    { text: "Imran", type: "out" },
    { text: "print(self.role)", type: "code" },
    { text: "CSE Student, DUET · ML Enthusiast", type: "out" },
    { text: "print(self.currently_solving)", type: "code" },
    { text: "'how to get more students their right scholarship'", type: "out" },
  ];

  const el = document.getElementById('typed-line');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderStatic(){
    el.innerHTML = lines.map(l => {
      if(l.type === 'code') return `<span class="kw">&gt;&gt;&gt;</span> ${l.text}`;
      return `<span class="out">${l.text}</span>`;
    }).join('\n');
  }

  async function typeLines(){
    el.innerHTML = '';
    for(const line of lines){
      const rowPrefix = line.type === 'code' ? '<span class="kw">&gt;&gt;&gt;</span> ' : '';
      const row = document.createElement('div');
      row.innerHTML = rowPrefix;
      el.appendChild(row);
      const span = document.createElement('span');
      if(line.type === 'out') span.className = 'out';
      row.appendChild(span);
      for(const ch of line.text){
        span.textContent += ch;
        await new Promise(r => setTimeout(r, line.type === 'code' ? 28 : 12));
      }
      await new Promise(r => setTimeout(r, 180));
    }
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);
  }

  if(reduceMotion){
    renderStatic();
  } else {
    typeLines();
  }

  // ---- gallery lightbox ----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt){
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.hidden = false;
    lightboxClose.focus();
  }
  function closeLightbox(){
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', () => {
      if(item.classList.contains('img-missing')) return;
      const img = item.querySelector('img');
      openLightbox(img.src, img.alt);
    });
    item.addEventListener('keydown', e => {
      if((e.key === 'Enter' || e.key === ' ') && !item.classList.contains('img-missing')){
        e.preventDefault();
        const img = item.querySelector('img');
        openLightbox(img.src, img.alt);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

  console.log('Portfolio loaded');
