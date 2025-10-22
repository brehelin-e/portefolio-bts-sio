// année auto
document.getElementById('year').textContent = new Date().getFullYear();

// thème
const toggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
if (toggle){
  toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    toggle.textContent = document.body.classList.contains('light') ? '☀︎' : '☾';
  });
  toggle.textContent = document.body.classList.contains('light') ? '☀︎' : '☾';
}

// scroll doux
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// cursor blob follow with lerp
const blob = document.querySelector('.cursor-blob');
let bx = window.innerWidth/2, by = window.innerHeight/2, tx = bx, ty = by;
window.addEventListener('mousemove', (e)=>{ tx = e.clientX; ty = e.clientY });
function loop(){ bx += (tx - bx)*0.15; by += (ty - by)*0.15; blob.style.transform = `translate(${bx-18}px, ${by-18}px)`; requestAnimationFrame(loop) }
loop();

// reveal on scroll (staggered)
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if (e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
},{ threshold: 0.15 });
reveals.forEach((el, i)=>{ setTimeout(()=>io.observe(el), i*40); });

// tilt effect
function initTilt(sel='.tilt', max=10){
  document.querySelectorAll(sel).forEach(card=>{
    let rect; const on = (ev)=>{
      rect = card.getBoundingClientRect();
      const x = (ev.clientX - rect.left)/rect.width*2 - 1;
      const y = (ev.clientY - rect.top)/rect.height*2 - 1;
      card.style.transform = `perspective(800px) rotateX(${-y*max}deg) rotateY(${x*max}deg)`;
    };
    const off = ()=>{ card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };
    card.addEventListener('mousemove', on);
    card.addEventListener('mouseleave', off);
  });
}
initTilt();

// magnetic buttons
function initMagnetic(sel='.magnetic', dist=24){
  document.querySelectorAll(sel).forEach(el=>{
    el.style.transition = 'transform .15s ease';
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width/2);
      const y = e.clientY - (r.top + r.height/2);
      el.style.transform = `translate(${(x/r.width)*dist}px, ${(y/r.height)*dist}px)`;
      el.style.setProperty('--mx', `${(x/r.width*50+50)}%`);
      el.style.setProperty('--my', `${(y/r.height*50+50)}%`);
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
  });
}
initMagnetic();

// parallax for decorative blobs
const blobs = document.querySelectorAll('[data-depth]');
window.addEventListener('mousemove', (e)=>{
  const cx = window.innerWidth/2, cy = window.innerHeight/2;
  const dx = (e.clientX - cx)/cx, dy = (e.clientY - cy)/cy;
  blobs.forEach(b=>{
    const d = parseFloat(b.dataset.depth || '0.02');
    b.style.transform = `translate(${dx*100*d}px, ${dy*100*d}px)`;
  });
});

// formulaire: validation + envoi via mailto avec contenu formaté
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function setError(input, message){
  const small = input.closest('.field')?.querySelector('.error');
  if (small){ small.textContent = message || ''; }
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  statusEl.textContent = '';

  const prenom = document.getElementById('prenom');
  const nom = document.getElementById('nom');
  const email = document.getElementById('email');
  const sujet = document.getElementById('sujet');
  const message = document.getElementById('message');
  const consent = document.getElementById('consent');

  let ok = true;
  if (!prenom.value.trim()){ setError(prenom, 'Prénom requis'); ok = false; } else setError(prenom, '');
  if (!nom.value.trim()){ setError(nom, 'Nom requis'); ok = false; } else setError(nom, '');
  if (!validEmail(email.value)){ setError(email, 'Email invalide'); ok = false; } else setError(email, '');
  if (!message.value.trim()){ setError(message, 'Message requis'); ok = false; } else setError(message, '');
  if (!consent.checked){ consent.focus(); statusEl.textContent = 'Merci d’accepter la case de consentement.'; ok = false; }

  if (!ok) return;

  const to = 'brehelin-e@saint-louis29.net';
  const subject = encodeURIComponent(`[Portfolio] ${sujet.value} — ${prenom.value} ${nom.value}`);
  const body = encodeURIComponent(
`Bonjour Ewen,

Nom: ${nom.value}
Prénom: ${prenom.value}
Email: ${email.value}
Sujet: ${sujet.value}

Message:
${message.value}

— Envoyé depuis le portfolio.`
  );
  const href = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = href;
  statusEl.textContent = 'Ouverture de votre client mail…';
});
