// Fichier: /api/chat.js (Proxy Serverless pour Vercel/Netlify)

import { GoogleGenAI } from '@google/genai';

// La clé est lue automatiquement et SÉCURISÉE depuis les variables d'environnement de Vercel
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY); 

export default async function (req, res) {
  // 1. Vérification de la méthode HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question manquante.' });
  }

  // 2. Préparation du prompt pour l'IA
  const prompt = `En tant qu'assistant virtuel d'Ewen (étudiant BTS SIO, spécialisé en Systèmes, Réseaux et passionné par le développement web), réponds de manière concise, professionnelle et amicale à cette question. Ton objectif est d'informer le visiteur sur ses compétences, projets ou parcours: "${question}"`;

  try {
    // 3. Appel à l'API Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      // Réglages optionnels: peut être ajusté pour plus de créativité ou de précision
      config: {
        temperature: 0.5, // Pour des réponses équilibrées
      },
    });

    // 4. Renvoi de la réponse au frontend
    res.status(200).json({ answer: response.text });

  } catch (error) {
    console.error('Erreur lors de l\'appel à Gemini:', error);
    // Renvoi d'un message d'erreur générique
    res.status(500).json({ error: 'Erreur de connexion à l\'IA. Vérifiez la clé API ou le quota.' });
  }
}