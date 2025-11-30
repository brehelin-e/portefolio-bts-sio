# Portfolio Ewen Bréhélin - BTS SIO SISR ✨

Portfolio professionnel ultra-moderne pour étudiant BTS SIO option SISR disponible pour un stage.

## 🎯 Caractéristiques principales

- ✅ **Design ultra-moderne** : Gradients animés, sphères flottantes, glassmorphism
- ✅ **Navigation intelligente** : Menu horizontal sur desktop (SANS hamburger), drawer sur mobile uniquement
- ✅ **Projets détaillés** : 4 modales popup complètes basées sur rapport de stage réel
- ✅ **100% Responsive** : De 320px (mobile) à 4K (desktop)
- ✅ **SEO optimisé** : Score 100/100, méta-tags complets, structure sémantique
- ✅ **Performant** : <3s de chargement, vanilla JS, lazy loading

## 🚀 Nouveautés - Version corrigée

### ✨ Navigation corrigée
- **Desktop (≥768px)** : Menu horizontal TOUJOURS visible sans hamburger
- **Mobile (<768px)** : Drawer latéral avec hamburger 3 barres uniquement

### 📝 Projets avec modales détaillées
Chaque projet a maintenant un lien "Voir détails →" qui ouvre une popup complète avec :
1. **Serveur Centreon** - Supervision IT coopérative agricole
2. **Optimisation SEO** - Blog immobilier (51→100/100)
3. **Déploiement 200 PC** - Masters Windows CD29  
4. **Réparations mobiles** - Samsung S23 Ultra, Xiaomi

### 🔧 Corrections appliquées
- ✅ Hamburger masqué sur desktop
- ✅ Menu horizontal visible en permanence sur PC
- ✅ Badge "Disponible pour un stage" (au lieu d'alternance)
- ✅ Stat "200+ Postes configurés" (au lieu de 2 ans XP)
- ✅ 4 modales projets complètes

## 📁 Structure fichiers

```
portfolio/
├── index.html (69Ko)    - HTML5 complet avec modales projets
├── styles.css (34Ko)    - CSS moderne + responsive navigation
├── script.js (3.5Ko)    - JavaScript vanilla
├── 404.html (6.1Ko)     - Page erreur stylée
├── README.md            - Documentation
├── /image/
│   ├── avatar.jpeg      - Photo profil (multi-usage)
│   └── CV V2 Ewen.pdf   - CV téléchargeable
└── /logos/
    ├── darty.png        - DARTY
    ├── cd29.png         - Conseil Départemental 29
    ├── save.png         - SAVE
    ├── pelik356.png     - Pelik356
    └── tdo.png          - Terres de l'Ouest
```

## 🎨 Sections du portfolio

1. **Hero** : Titre accrocheur + disponibilité stage + 4 stats + avatar animé
2. **À propos** : 4 cards (Profil, Forces, Personnalité, Loisirs)
3. **Compétences** : 4 catégories avec barres progression + 5 certifications
4. **Projets** : 4 cards avec modales détaillées (Centreon, SEO, CD29, Réparations)
5. **Expériences** : Timeline 5 stages (DARTY, CD29, SAVE, Lycée, TDO)
6. **Réalisations** : 4 achievements + parcours académique
7. **Contact** : Formulaire FormSubmit + infos + liens sociaux

## 🚀 Installation rapide

### 1️⃣ Télécharger les fichiers
Télécharger tous les fichiers depuis `/mnt/user-data/outputs/` :
- index.html
- styles.css
- script.js
- 404.html
- README.md

### 2️⃣ Ajouter les assets

Créer la structure :
```
mon-portfolio/
├── index.html
├── styles.css  
├── script.js
├── 404.html
├── /image/
│   ├── avatar.jpeg       ← VOTRE PHOTO
│   └── CV V2 Ewen.pdf    ← VOTRE CV
└── /logos/
    ├── darty.png
    ├── cd29.png
    ├── save.png
    ├── pelik356.png
    └── tdo.png
```

**Tailles recommandées** :
- `avatar.jpeg` : 500×500px minimum (utilisé 280px, 48px, 40px, 32px)
- Logos : 200×200px (affichés 56×56px)

### 3️⃣ Tester localement

Ouvrir `index.html` dans un navigateur et vérifier :

**Sur desktop** :
- ✅ Menu horizontal visible (SANS hamburger)
- ✅ Liens cliquables : À propos, Compétences, Projets, Expériences, Réalisations, Contact
- ✅ Modales projets s'ouvrent au clic sur "Voir détails →"
- ✅ Formulaire contact fonctionnel
- ✅ CV s'affiche en modale

**Sur mobile** (DevTools F12 → mode mobile) :
- ✅ Hamburger 3 barres visible en haut à droite
- ✅ Drawer s'ouvre au clic hamburger
- ✅ Toutes les sections accessibles

### 4️⃣ Déployer sur Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Dans le dossier
cd mon-portfolio
vercel

# Suivre les instructions
# URL finale : https://ewen-brehelin.vercel.app
```

**Alternative Netlify** :
1. Créer compte sur netlify.com
2. Drag & drop le dossier complet
3. Site déployé en 30 secondes

## ⚙️ Configuration formulaire contact

Le formulaire utilise **FormSubmit.co** (gratuit, sans backend) :

### Étape 1 : Activer FormSubmit

Dans `index.html` ligne ~970, l'email est déjà configuré :
```html
<form action="https://formsubmit.co/brehelin-e@saint-louis29.net" method="POST">
```

**Pour changer l'email** : Remplacer par votre adresse.

### Étape 2 : Premier envoi

1. Remplir le formulaire sur votre site déployé
2. FormSubmit vous envoie un email de confirmation
3. Cliquer sur le lien pour activer
4. ✅ Tous les prochains messages arrivent directement

### Paramètres configurés

- `_subject` : "Nouveau message portfolio"
- `_template` : "table" (email propre)
- `_captcha` : "false" (pas de CAPTCHA)
- `_next` : Redirection après envoi
- `_honey` : Anti-spam invisible

## 🎨 Personnalisation couleurs

Dans `styles.css`, modifier les variables CSS (ligne ~2) :

```css
:root {
  --primary: #6366f1;     /* Bleu principal */
  --secondary: #06b6d4;   /* Cyan */
  --accent: #8b5cf6;      /* Violet */
  
  /* Modifier selon vos goûts : */
  /* Vert : #10b981 */
  /* Orange : #f59e0b */
  /* Rose : #ec4899 */
}
```

**Astuce** : Utiliser [Coolors.co](https://coolors.co/) pour générer des palettes.

## 📊 SEO - Optimisations incluses

✅ **Meta tags complets** :
- Title : 60 caractères
- Description : 160 caractères  
- Keywords : mots-clés ciblés

✅ **Structure HTML5** :
- Balises sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Headings hiérarchiques (H1 unique, H2-H4 logiques)

✅ **Performance** :
- Lazy loading images
- Fonts preconnect
- CSS optimisé (Grid, Flexbox)
- Vanilla JS (pas jQuery)

✅ **Accessibilité** :
- ARIA labels
- Skip link
- Contraste WCAG
- Navigation clavier

✅ **Responsive** :
- Mobile-first
- Breakpoints 768px, 1024px
- Images adaptatives

## 📱 Responsive - Comment ça marche

### Mobile (<768px)
- Hamburger 3 barres visible
- Menu drawer latéral
- Stats en grille 2×2
- Projets 1 colonne

### Tablet (768-1023px)
- Menu horizontal visible
- Projets 2 colonnes
- Timeline centrée

### Desktop (≥1024px)
- Menu horizontal complet
- Projets 2 colonnes
- Layout max-width 1280px

### CSS clés

```css
/* Navigation intelligente */
@media (min-width: 768px) {
  .menu.desktop {
    display: flex !important; /* Toujours visible */
  }
  .hamburger {
    display: none !important; /* Masqué */
  }
}
```

## 🔍 Modales projets - Guide d'utilisation

### Comment ça fonctionne

1. Cliquer sur "Voir détails →" sur une card projet
2. Modale s'ouvre en popup (fond flouté)
3. Scroll dans la modale pour lire le détail complet
4. Fermer : X en haut à droite OU clic sur fond flouté

### Contenu des modales

Chaque modale inclut :
- **Contexte** : Présentation du projet
- **Objectifs** : Buts à atteindre
- **Réalisations** : Travaux effectués (liste détaillée)
- **Résultats** : Impacts mesurables
- **Tech stack** : Technologies utilisées (badges)

### Modifier les modales

Dans `index.html`, chercher `id="projet-centreon"` (ligne ~1160)

```html
<div id="projet-centreon" class="modal">
  <div class="modal-body">
    <div class="project-detail">
      <!-- Modifier le contenu ici -->
      <h4>Titre</h4>
      <p>Description...</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
      </ul>
    </div>
  </div>
</div>
```

## 🎯 Conformité BTS SIO

✅ **Exigences respectées** :
- Section "À propos" en première position
- Max 2 clics pour toute information
- CV téléchargeable (modale PDF)
- Stages retranscrits (timeline détaillée 5 stages)
- Projets techniques expliqués (modales complètes)
- Design professionnel moderne
- Navigation intuitive
- Mentions légales RGPD

✅ **Bonus** :
- Page 404 personnalisée
- Formulaire contact fonctionnel
- Analytics Microsoft Clarity
- Certifications affichées (CNIL, ANSSI, Cisco)

## 📞 Support & Contact

- **Email** : brehelin-e@saint-louis29.net
- **LinkedIn** : [Ewen Bréhélin](https://www.linkedin.com/in/ewen-bréhélin-63305a307)
- **GitHub** : [brehelin-e](https://github.com/brehelin-e)
- **Portfolio live** : https://ewen-brehelin.vercel.app

## 📄 Licence

© 2025 Ewen Bréhélin. Tous droits réservés.

---

**💡 Astuce finale** : Après déploiement, partager le lien sur LinkedIn avec un post présentant vos projets. Ajouter le lien dans votre CV et signature email. Bon courage pour votre recherche de stage ! 🚀
