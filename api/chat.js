// Fichier : api/chat.js
const { GoogleGenAI } = require('@google/genai');

// Le client est initialisé ici. Il trouvera automatiquement la clé API
// GEMINI_API_KEY définie dans les variables d'environnement de Vercel.
const ai = new GoogleGenAI({}); 

// NOUVELLES INSTRUCTIONS SYSTÈME POUR LA CONCISION ET LE FORMATAGE
const systemInstruction = `
  Tu es l'assistant virtuel IA d'Ewen Bréhélin.
  Ton objectif est de répondre aux questions des visiteurs concernant son profil professionnel.
  
  Règles de style strictes (IMPERATIF) :
  1. Les réponses doivent être courtes, concises, et aller droit au but. Pas de texte trop long.
  2. Chaque idée ou information doit être dans une phrase simple, séparée clairement par un saut de ligne ou une ponctuation forte.
  3. Tu ne dois utiliser AUCUN caractère de mise en forme spécial ou décoratif (astérisques, tirets, emojis, gras).
  4. Le ton doit rester professionnel et simple.
  5. Base-toi uniquement sur les informations factuelles fournies ci-dessous.

  Informations factuelles sur Ewen Bréhélin :
  - Domaine d'expertise : Administration systèmes et réseaux (SISR), développement web, cybersécurité.
  - Compétences clés : Windows Server, Linux (Debian/Ubuntu), Réseaux (VLAN, DHCP, DNS), Développement (HTML, CSS, JS, PHP, MySQL, C#, PowerShell, Python).
  - Statut : Disponible pour un stage.
  - Certifications : Certification PIX (Niveau expert en compétences numériques).
  - Expériences clés (Projets) :
    1. Serveur de supervision Centreon (Installation complète sur Debian 12 pour supervision IT, Terres de l'Ouest).
    2. Optimisation SEO blog immobilier (Correction technique, score Ahrefs passé de 51/100 à 100/100, Pelik356).
    3. Déploiement de 200 ordinateurs (Masters Windows, PXE Boot, CD29).
    4. Réparations Smartphones Avancées (Samsung S23 Ultra, Xiaomi, encollage, SAVE Quimper).
  - Ne réponds jamais aux questions qui ne sont pas liées à Ewen Bréhélin, à la technologie, à l'infrastructure, au développement ou à son portfolio.
`;

// Historique de la conversation (stocké côté serveur pour la durée de l'appel)
let history = [];

module.exports = async (req, res) => {
  // Seules les méthodes POST sont autorisées (depuis le frontend)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question, currentHistory = [] } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Missing question in request body.' });
    }

    // Reconstruction de l'historique avec le nouveau message
    history = [...currentHistory, { role: "user", parts: [{ text: question }] }];

    // Appel au modèle Gemini
    const chat = ai.chats.create({
      model: "gemini-2.5-flash", 
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });
    
    // Envoi du message et attente de la réponse
    const response = await chat.sendMessage({ message: question });

    // Envoi de la réponse
    res.status(200).json({
      answer: response.text,
    });

  } catch (error) {
    console.error("Erreur Gemini API:", error);
    res.status(500).json({ 
      error: 'Erreur lors de la communication avec l\'API Gemini.',
      details: error.message 
    });
  }
};