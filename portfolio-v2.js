/* =================================================================
   PORTFOLIO V2 - JAVASCRIPT
   Animations, particules, navigation, modales
   ================================================================= */

// ===============================================
// 1. INITIALISATION AOS (Animations on Scroll)
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
  // Init AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100
    });
  }

  // Init toutes les fonctionnalités
  initParticles();
  initNavigation();
  initModals();
  initTypewriter();
  initScrollIndicator();
  initMobileMenu();
});

// ===============================================
// 2. MENU BURGER MOBILE
// ===============================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer || !overlay) return;

  // Toggle menu
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    drawer.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('show');
  });

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      drawer.classList.remove('open');
      overlay.classList.remove('show');
    });
  });
}

// ===============================================
// 3. SYSTÈME DE PARTICULES ANIMÉES (CANVAS)
// ===============================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  // Redimensionner le canvas
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Classe Particle
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Rebond sur les bords
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Créer particules
  function createParticles() {
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Animation
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Lignes de connexion
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });

    animationId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();

  // Cleanup
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resizeCanvas);
  };
}

// ===============================================
// 3. NAVIGATION ACTIVE & SMOOTH SCROLL
// ===============================================
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section, .hero');

  // Smooth scroll
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      
      if (href && href.startsWith('#') && !href.includes('-modal')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Highlighter section active
  function highlightActiveSection() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Init
}

// ===============================================
// 4. GESTION DES MODALES
// ===============================================
function initModals() {
  const modals = document.querySelectorAll('.modal');

  // Ouvrir modale
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[href^="#"][href*="-modal"], [href^="#projet-"]');
    if (!trigger) return;

    e.preventDefault();
    const modalId = trigger.getAttribute('href').substring(1);
    const modal = document.getElementById(modalId);

    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      window.location.hash = modalId;
    }
  });

  // Fermer modales
  modals.forEach(modal => {
    // Bouton close
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    // Click backdrop
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => closeModal(modal));
    }
  });

  // Touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'flex') {
          closeModal(modal);
        }
      });
    }
  });

  // Fonction fermeture
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    if (window.location.hash) {
      history.pushState('', document.title, window.location.pathname);
    }
  }

  // Ouvrir modale depuis hash URL
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const modal = document.getElementById(hash);
    if (modal && modal.classList.contains('modal')) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  // Exposer fonction globalement
  window.closeModal = (modalId) => {
    const modal = typeof modalId === 'string' 
      ? document.getElementById(modalId) 
      : modalId;
    if (modal) closeModal(modal);
  };
}

// ===============================================
// 5. EFFET TYPEWRITER
// ===============================================
function initTypewriter() {
  const element = document.querySelector('.typing-text');
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  element.style.borderRight = '3px solid var(--accent)';

  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    } else {
      // Animation du curseur une fois le texte terminé
      setInterval(() => {
        element.style.borderRightColor = 
          element.style.borderRightColor === 'transparent' 
            ? 'var(--accent)' 
            : 'transparent';
      }, 500);
    }
  }

  setTimeout(type, 500);
}

// ===============================================
// 6. SCROLL INDICATOR
// ===============================================
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '1';
      indicator.style.pointerEvents = 'auto';
    }
  });
}

// ===============================================
// 7. ANIMATIONS BARRES DE COMPÉTENCES (Non utilisé en V2)
// ===============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillFills = entry.target.querySelectorAll('.skill-fill');
      skillFills.forEach(fill => {
        fill.style.width = fill.style.getPropertyValue('--width') || '0%';
      });
    }
  });
}, { threshold: 0.3 });

// Observer la section compétences
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  observer.observe(skillsSection);
}

// ===============================================
// 8. SMOOTH SCROLL POUR TOUS LES LIENS ANCRES
// ===============================================
document.querySelectorAll('a[href^="#"]:not([href*="-modal"]):not([href*="projet-"])').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#!') return;

    e.preventDefault();
    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===============================================
// 9. FORMULAIRE DE CONTACT
// ===============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Le formulaire utilise FormSubmit, pas besoin de preventDefault
    // Mais on peut ajouter une validation custom ici si besoin
    console.log('Formulaire envoyé avec succès !');
  });
}

// ===============================================
// 10. PERFORMANCE - Lazy loading images
// ===============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===============================================
// 11. CONSOLE MESSAGE
// ===============================================
console.log('%c🚀 Portfolio Ewen Bréhélin V2', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé avec passion ❤️', 'color: #8b5cf6; font-size: 14px;');
console.log('%cContact: brehelin-e@saint-louis29.net', 'color: #06b6d4; font-size: 12px;');

// ===============================================
// 12. CHATBOT IA
// ===============================================
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const window = document.getElementById('chatbot-window');
  const close = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const messagesContainer = document.getElementById('chatbot-messages');
  const suggestions = document.querySelectorAll('.suggestion-chip');

  if (!toggle || !window) return;

  // Ouvrir/Fermer chatbot
  toggle.addEventListener('click', () => {
    window.classList.toggle('open');
  });

  close.addEventListener('click', () => {
    window.classList.remove('open');
  });

  // Base de connaissances
  const knowledge = {
    'compétences': 'Je maîtrise Windows Server, Linux, les réseaux (VLAN, DHCP, DNS), le développement web (HTML/CSS/JS, PHP/MySQL), et PowerShell. J\'ai une certification PIX et une expertise en administration système.',
    'projets': 'J\'ai réalisé 4 projets majeurs : installation d\'un serveur Centreon pour la supervision IT, optimisation SEO (score 51→100/100), déploiement de 200 PC pour le CD29, et réparations smartphones avancées.',
    'parcours': 'Je suis en BTS SIO option SISR au Lycée Saint-Louis de Châteaulin. J\'ai effectué 5 stages professionnels chez DARTY, le Conseil Départemental 29, SAVE, Pelik356, et Terres de l\'Ouest.',
    'contact': 'Vous pouvez me contacter par email à brehelin-e@saint-louis29.net, par téléphone au 07 72 72 04 38, ou via le formulaire de contact sur cette page.',
    'centreon': 'J\'ai installé et configuré Centreon 24.10 sur Debian 12 pour superviser serveurs, routeurs, switchs et Wi-Fi. Configuration SNMP, alertes automatiques, et vues personnalisées.',
    'seo': 'J\'ai réalisé un audit SEO complet d\'un blog immobilier : le score est passé de 51/100 à 100/100. Correction de 1750 URLs, optimisation images, restructuration balisage.',
    'cd29': 'J\'ai configuré 200 ordinateurs Thinkpad T480 pour le Conseil Départemental : installation réseau PXE, masters Windows 10 personnalisés, tests validation complets.',
    'formation': 'BTS SIO (Services Informatiques aux Organisations) option SISR (Solutions d\'Infrastructure, Systèmes et Réseaux) au Lycée Saint-Louis de Châteaulin.',
    'certification': 'J\'ai obtenu la certification PIX qui valide mes compétences numériques au niveau expert.',
    'disponibilité': 'Je suis actuellement disponible pour un stage. N\'hésitez pas à me contacter pour discuter de vos besoins !',
    'cv': 'Vous pouvez télécharger mon CV en cliquant sur le bouton "Télécharger mon CV" en haut de la page ou dans la section contact.',
    'linkedin': 'Retrouvez-moi sur LinkedIn : linkedin.com/in/ewen-bréhélin-63305a307',
    'github': 'Mon profil GitHub : github.com/brehelin-e'
  };

  // Fonction pour obtenir une réponse
  function getResponse(question) {
    question = question.toLowerCase();

    // Correspondances exactes
    for (const [key, value] of Object.entries(knowledge)) {
      if (question.includes(key)) {
        return value;
      }
    }

    // Mots-clés alternatifs
    if (question.includes('skills') || question.includes('savoir')) return knowledge.compétences;
    if (question.includes('project') || question.includes('réalisation')) return knowledge.projets;
    if (question.includes('étude') || question.includes('école')) return knowledge.formation;
    if (question.includes('mail') || question.includes('téléphone') || question.includes('joindre')) return knowledge.contact;
    if (question.includes('stage') || question.includes('alternance') || question.includes('emploi')) return knowledge.disponibilité;

    // Réponse par défaut
    return 'Je ne suis pas sûr de comprendre. Essayez de me poser une question sur les compétences, les projets, le parcours ou les coordonnées d\'Ewen. Vous pouvez aussi utiliser les suggestions ci-dessus ! 😊';
  }

  // Ajouter un message
  function addMessage(text, isBot = true) {
    const message = document.createElement('div');
    message.className = `chat-message ${isBot ? 'bot' : 'user'}`;
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Afficher l'animation typing
  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Retirer l'animation typing
  function hideTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }

  // Envoyer un message
  function sendMessage() {
    const question = input.value.trim();
    if (!question) return;

    // Afficher la question de l'utilisateur
    addMessage(question, false);
    input.value = '';

    // Simuler un délai de réponse
    showTyping();
    setTimeout(() => {
      hideTyping();
      const response = getResponse(question);
      addMessage(response, true);
    }, 1000 + Math.random() * 1000);
  }

  // Event listeners
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Suggestions cliquables
  suggestions.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.dataset.question;
      input.value = question;
      sendMessage();
    });
  });
}

// Initialiser le chatbot
document.addEventListener('DOMContentLoaded', initChatbot);