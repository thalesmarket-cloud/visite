
import { VisitStep } from './types';

export const INITIAL_STEPS: VisitStep[] = [
  {
    id: '1',
    title: 'Accueil & immersion marocaine',
    duration: '30 min',
    objective: 'Première impression chaleureuse pour Factorial',
    actions: [
      'Thé marocain à la menthe de bienvenue',
      'Pâtisseries traditionnelles (cornes de gazelle, etc.)',
      'Présentation informelle de l’équipe Thales'
    ],
    tips: [
      'Carte du Maroc sur la table',
      'Playlist musicale marocaine douce'
    ],
    icon: 'Coffee'
  },
  {
    id: '2',
    title: 'Session business & partenariat',
    duration: '3h 00',
    objective: 'Alignement stratégique Thales x Factorial',
    actions: [
      'Présentation de THALES INFORMATIQUE',
      'Vision commune & Opportunités avec Factorial',
      'Analyse du Marché marocain & africain pour nos solutions'
    ],
    tips: [
      'Slide "Pourquoi le partenariat Factorial est stratégique"',
      'Comparatif marché France / Maroc'
    ],
    icon: 'Briefcase'
  },
  {
    id: '3',
    title: 'Pause culturelle & storytelling',
    duration: '30 min',
    objective: 'Créer un lien émotionnel fort',
    actions: [
      'Mini présentation : "Le Maroc en 10 minutes"',
      'Focus sur l’Hospitalité et la Business Culture locale'
    ],
    tips: [
      'Support visuel riche en photos authentiques'
    ],
    icon: 'Globe'
  },
  {
    id: '4',
    title: 'Déjeuner / expérience locale',
    duration: '1h 30',
    objective: 'Expérience gastronomique mémorable',
    actions: [
      'Restaurant marocain authentique sélectionné',
      'Dégustation (Couscous, Tajine, Pastilla)',
      'Échanges libres et conviviaux'
    ],
    tips: [
      'Réserver une table calme propice à l’échange'
    ],
    icon: 'Utensils'
  },
  {
    id: '5',
    title: 'Moment contenu & communication',
    duration: '20 min',
    objective: 'Valorisation du partenariat sur les réseaux',
    actions: [
      'Photos professionnelles des équipes',
      'Vidéo courte : "Thales & Factorial au Maroc"',
      'Interview croisée sur la vision commune'
    ],
    tips: [
      'Préparer les questions simples à l’avance'
    ],
    icon: 'Camera'
  },
  {
    id: '6',
    title: 'Cadeau symbolique de fin',
    duration: '10 min',
    objective: 'Laisser une trace positive durable',
    actions: [
      'Remise d’un cadeau artisanal élégant à Factorial',
      'Mot de clôture : "Bienvenue dans l’écosystème Thales Maroc."'
    ],
    tips: [
      'Coffret thé premium ou maroquinerie locale'
    ],
    icon: 'Gift'
  }
];
