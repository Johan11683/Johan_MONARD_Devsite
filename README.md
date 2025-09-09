# Mon Site CV – Portfolio interactif de développeur web
Projet personnel de fin de formation – OpenClassrooms
Objectif : Créer un site vitrine interactif pour présenter mon parcours, mes projets, mes compétences et ma personnalité de manière originale et professionnelle.

# Contexte
Dans ce projet, j’ai conçu un site CV complet avec Next.js (React framework) et une partie back-end intégrée pour l’envoi sécurisé d’e-mails.

Le site vise à valoriser mon profil de développeur full-stack débutant, à travers :
- Une interface moderne et animée
- Une section originale "Tale of the Tape" inspirée de la boxe
- Un carrousel de compétences
- Une galerie de projets avec descriptions
- Un formulaire de contact sécurisé et fonctionnel
- Une performance et accessibilité optimisées

Technologies utilisées
- Next.js (React + API routes)
- TypeScript
- Sass (SCSS)
- Framer Motion (animations)
- Keen Slider (carrousel)
- i18next (traduction multilingue)
- Nodemailer (envoi d’e-mails côté back-end)
- Helmet, cors, rate-limiter-flexible (sécurité)
- Vercel + Render (déploiement)


Fonctionnalités principales
- Application Next.js avec rendering optimisé
- Navigation fluide et responsive
- Mode sombre/clair avec animation
- Carrousel horizontal pour les compétences techniques
- Section "Tale of the Tape" (soft skills présentés de manière originale)

Formulaire de contact avec :
- Validation des champs
- Envoi via API route sécurisée
- Nodemailer pour transmettre le message
- Protection contre les bots / flood
- Traduction FR/EN avec i18n et switch de langue

Sécurité renforcée :
- Headers sécurisés avec Helmet
- Limitation du spam avec rate-limiter-flexible
- Protection CORS

Performances et optimisations
- Accessibilité, SEO et performances web maîtrisées
- Objectif Lighthouse

  LIGHTHOUSE MOBILE & DESKTOP <img width="305" height="101" alt="image" src="https://github.com/user-attachments/assets/4a0a5356-4061-43a9-8201-2f6a4788409f" />
  WAVE <img width="263" height="82" alt="image" src="https://github.com/user-attachments/assets/2ab7d5d7-0c4b-4aa3-af97-e82a30cee97f" />



Lancer le projet en local
```bash

git clone https://github.com/Johan11683/Johan_MONARD_Devsite.git
cd FRONT
npm install
npm run dev

cd BACK
npm install
node server
``` 
Ce que j’ai appris
- Développement complet avec Next.js (frontend + backend)
- Gestion du routage, du SSR et des API routes avec Next
- Intégration et sécurisation d’un formulaire de contact avec Nodemailer
- Intégration i18n pour le multilingue
- Optimisation des performances Lighthouse
- Utilisation d’animations CSS (SCSS)
- Création d’UI dynamiques avec Sass et composants React
- Sécurisation de l’API avec Helmet, CORS, et anti-spam
- Déploiement professionnel sur Vercel et Render
- Nom de domaine (OVH)
