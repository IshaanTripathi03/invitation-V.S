/* ============================================================
   WEDDING SITE — Vidisha & Shubham
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 600);
  });
  setTimeout(() => document.getElementById('loader').classList.add('hide'), 2200);

  /* ---------- NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  });

  /* ---------- FLORAL CORNER SVGs (line-art botanical motif) ---------- */
  const floralPath = `
    <g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
      <path d="M2 2 C40 4 70 18 80 55 C86 78 100 95 130 100" opacity=".55"/>
      <path d="M2 2 C30 6 50 25 55 50" opacity=".4"/>
      <ellipse cx="34" cy="14" rx="9" ry="5" transform="rotate(28 34 14)" fill="currentColor" opacity=".18"/>
      <ellipse cx="50" cy="28" rx="11" ry="6" transform="rotate(40 50 28)" fill="currentColor" opacity=".22"/>
      <ellipse cx="64" cy="46" rx="8" ry="5" transform="rotate(55 64 46)" fill="currentColor" opacity=".18"/>
      <circle cx="20" cy="8" r="3" fill="currentColor" opacity=".5"/>
      <circle cx="44" cy="20" r="2.2" fill="currentColor" opacity=".45"/>
      <circle cx="58" cy="38" r="2.6" fill="currentColor" opacity=".4"/>
      <path d="M10 4 q6 8 0 14 q-6 -6 0 -14Z" fill="currentColor" opacity=".3"/>
      <path d="M28 16 q8 6 4 16 q-10 -2 -4 -16Z" fill="currentColor" opacity=".28"/>
    </g>`;
  ['corner-svg-tl','corner-svg-tr','corner-svg-bl','corner-svg-br'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.innerHTML = floralPath;
  });

  /* ---------- PETAL FIELD ---------- */
  const petalField = document.getElementById('petal-field');
  const petalSVG = (color) => `
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path d="M16 2 C24 6 28 14 16 30 C4 14 8 6 16 2Z" fill="${color}" opacity="0.8"/>
    </svg>`;
  const petalColors = ['#EFC4A0', '#E9C2BB', '#F3DBD3', '#DDBE8C'];
  function spawnPetal(){
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 10 + Math.random()*14;
    p.style.width = size+'px';
    p.style.height = size+'px';
    p.style.left = Math.random()*100+'vw';
    p.style.setProperty('--drift', (Math.random()*120-60)+'px');
    const dur = 9 + Math.random()*10;
    p.style.animationDuration = dur+'s';
    p.style.animationDelay = (Math.random()*2)+'s';
    p.innerHTML = petalSVG(petalColors[Math.floor(Math.random()*petalColors.length)]);
    petalField.appendChild(p);
    setTimeout(()=>p.remove(), (dur+2)*1000);
  }
  for(let i=0;i<12;i++) setTimeout(spawnPetal, i*350);
  setInterval(spawnPetal, 1400);

  /* ---------- HERO MOUSE PARALLAX ---------- */
  const hero = document.getElementById('hero');
  const layers = [document.getElementById('layer-sky'), document.getElementById('layer-palace'), document.getElementById('layer-water')];
  hero?.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    layers.forEach((layer, i) => {
      const depth = (i+1) * 6;
      layer.style.transform = `translate(${x*depth}px, ${y*depth}px)`;
    });
  });
  // gentle scroll parallax too
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if(sc < window.innerHeight){
      layers.forEach((layer,i)=>{
        layer.style.transform = `translateY(${sc * (0.08 + i*0.05)}px)`;
      });
    }
  });

  /* ---------- COUNTDOWN ---------- */
  const VARMALA_DATE = new Date('2026-07-11T18:00:00+05:30').getTime();
  const countdownEl = document.getElementById('countdown');
  let countdownDone = false;
  function tickCountdown(){
    const diff = VARMALA_DATE - Date.now();
    if(diff <= 0){
      if(!countdownDone){
        countdownEl.className = 'countdown-complete';
        countdownEl.textContent = 'The Varmala Ceremony Has Begun! 💍✨';
        countdownDone = true;
      }
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-days').textContent = String(d).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-zoom');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // stagger event cards within each timeline row using GSAP if available
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.event-card').forEach((card, i) => {
      gsap.fromTo(card, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%' }
      });
    });
  }

    /* ---------- MENU AND UI CONTROLS ---------- */
  const mobileMenu = document.getElementById('mobile-menu');
  const navBurger = document.getElementById('nav-burger');
  const mobileClose = document.getElementById('mobile-close');
  const scrollCue = document.getElementById('scroll-cue');
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightbox-inner');
  const lightboxClose = document.getElementById('lightbox-close');

  function openMobileMenu(){
    mobileMenu?.classList.add('open');
  }

  function closeMobileMenu(){
    mobileMenu?.classList.remove('open');
  }

  function scrollToTimeline(){
    document.getElementById('day1')?.scrollIntoView({ behavior: 'smooth' });
  }

  function openLightbox(g){
    if(!lightbox || !lightboxInner) return;
    lightboxInner.innerHTML = g.src
      ? `<img src="${g.src}" alt="${g.label}" style="max-width:90vw;max-height:85vh;border-radius:8px;display:block;">
         <div class="lightbox-caption">${g.label}</div>`
      : `<div class="lightbox-card ${g.className}">
           <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.3" opacity="0.85"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-9 8"/></svg>
           <div class="lightbox-caption">${g.label}</div>
         </div>`;
    lightbox.classList.add('open');
  }

  function closeLightbox(){
    lightbox?.classList.remove('open');
  }

  navBurger?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  document.querySelectorAll('.mobile-nav-link').forEach(link => link.addEventListener('click', closeMobileMenu));
  scrollCue?.addEventListener('click', scrollToTimeline);
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if(e.target.id === 'lightbox') closeLightbox();
  });

  /* ---------- GALLERY ---------- */
  const galleryData = [
    { label: 'The Proposal',        tall: true,  src: 'assets/images/proposal-img.jpeg',                                    className: 'gallery-grad-proposal'   },
    // { label: 'Haldi Mornings',                   src: null,                                    className: 'gallery-grad-haldi'      },
    // { label: 'Mehendi Hands',                    src: null,                                    className: 'gallery-grad-mehendi'    },
    // { label: 'Family & Friends',    tall: true,  src: null,                                    className: 'gallery-grad-family'     },
    // { label: 'Sangeet Lights',                   src: null,                                    className: 'gallery-grad-sangeet'    },
    { label: 'Engagement Day',                   src: 'assets/images/engagement-img.jpeg',     className: 'gallery-grad-engagement' },
    { label: 'Pre-Wedding Shoot',   tall: true,  src: 'assets/images/preWedding-img.jpeg',                                    className: 'gallery-grad-prewedding' },
    { label: 'Our Story',                        src: 'assets/images/bike-img.jpeg',                                    className: 'gallery-grad-story'      },
    { label: 'Chandni Chowk Photos',             src: 'assets/images/chandniChowk-img.jpeg',                                    className: 'gallery-grad-proposal'   },
  ];
  const grid = document.getElementById('masonry-grid');
  galleryData.forEach((g) => {
    const item = document.createElement('div');
    item.className = 'g-item' + (g.tall ? ' h-tall' : '');
    const fill = g.src
      ? `<img class="g-fill" src="${g.src}" alt="${g.label}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`
      : `<div class="g-fill gallery-fill ${g.className}">
           <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" opacity="0.65"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-9 8"/></svg>
         </div>`;
    item.innerHTML = fill + `<div class="g-overlay">${g.label}</div>`;
    item.addEventListener('click', () => openLightbox(g));
    grid?.appendChild(item);
  });

  /* ---------- RSVP RADIO PILLS ---------- */
  document.querySelectorAll('.radio-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.radio-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      pill.querySelector('input').checked = true;
    });
  });

  /* ---------- RSVP FORM SUBMIT ---------- */
  const rsvpForm = document.getElementById('rsvp-form');
  rsvpForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    rsvpForm.style.display = 'none';
    const success = document.getElementById('rsvp-success');
    success.classList.add('show');
    const attending = document.querySelector('.radio-pill.active')?.dataset.rsvp;
    if(attending === 'yes') launchConfetti();
  });
});


/* ---------- CONFETTI ---------- */
function launchConfetti(){
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#EFC4A0', '#C8A165', '#BD5F54', '#E9C2BB', '#FBF3EA'];
  let pieces = Array.from({length: 140}, () => ({
    x: Math.random()*canvas.width,
    y: -20 - Math.random()*canvas.height*0.5,
    r: 4 + Math.random()*6,
    c: colors[Math.floor(Math.random()*colors.length)],
    vy: 2 + Math.random()*3,
    vx: -1.5 + Math.random()*3,
    rot: Math.random()*360,
    vr: -6 + Math.random()*12
  }));
  let frame = 0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*0.6);
      ctx.restore();
    });
    frame++;
    if(frame < 220) requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if(!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
