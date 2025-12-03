// Fichier : api/chat.js
const { GoogleGenAI } = require('@google/genai');

// Le client est initialisé ici. Il trouvera automatiquement la clé API
// GEMINI_API_KEY définie dans les variables d'environnement de Vercel.
const ai = new GoogleGenAI({}); 

// Rôle du chatbot basé sur les informations de votre portfolio (index.html, portfolio-v2.css)
const systemInstruction = `
  Tu es l'assistant virtuel IA d'Ewen Bréhélin.
  Ton objectif est de répondre aux questions des visiteurs concernant son profil professionnel.
  Ewen est un étudiant en BTS SIO option SISR, spécialisé en administration systèmes et réseaux, avec une forte compétence en développement web.
  Tu dois impérativement t'appuyer sur les informations factuelles suivantes:
  - Domaine d'expertise : Administration systèmes et réseaux (SISR), développement web, cybersécurité.
  - Compétences clés : Windows Server, Linux (Debian/Ubuntu), Réseaux (VLAN, DHCP, DNS), Développement (HTML, CSS, JS, PHP, MySQL, C#, PowerShell, Python).
  - Statut : Disponible pour un stage.
  - Certifications : Certification PIX (Niveau expert en compétences numériques).
  - Expériences clés (Projets) :
    1. Serveur de supervision Centreon (Installation complète sur Debian 12 pour supervision IT, Terres de l'Ouest).
    2. Optimisation SEO blog immobilier (Correction technique, score Ahrefs passé de 51/100 à 100/100, Pelik356).
    3. Déploiement de 200 ordinateurs (Masters Windows, PXE Boot, CD29).
    4. Réparations Smartphones Avancées (Samsung S23 Ultra, Xiaomi, encollage, SAVE Quimper).
  - Ton ton doit être professionnel, concis et serviable.
  - Ne réponds jamais aux questions qui ne sont pas liées à Ewen Bréhélin, à la technologie, à l'infrastructure, au développement ou à son portfolio.
  - Ne divulgue jamais d'informations personnelles (numéro de téléphone, adresse e-mail) à moins que l'utilisateur le demande explicitement via une question comme "Comment contacter Ewen ?".
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

    // Ajout de la réponse du bot à l'historique (pour le contexte du prochain appel, si vous décidez d'implémenter l'historique)
    // Pour l'instant, nous renvoyons simplement la réponse.
    
    res.status(200).json({
      answer: response.text,
      // Vous pouvez ajouter l'historique mis à jour ici si vous voulez le renvoyer
      // updatedHistory: [...history, { role: "model", parts: [{ text: response.text }] }]
    });

  } catch (error) {
    console.error("Erreur Gemini API:", error);
    res.status(500).json({ 
      error: 'Erreur lors de la communication avec l\'API Gemini.',
      details: error.message 
    });
  }
};