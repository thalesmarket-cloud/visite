
import { VisitStep } from './types';

export const INITIAL_STEPS: VisitStep[] = [
  {
    id: '1',
    title: 'Accueil & immersion marocaine',
    duration: '30 min',
    objective: 'Première impression chaleureuse',
    actions: [
      'Thé marocain à la menthe',
      'Pâtisseries traditionnelles (cornes de gazelle, etc.)',
      'Présentation informelle de l’équipe'
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
    duration: '1h 30',
    objective: 'Sérieux & alignement stratégique',
    actions: [
      'Présentation de THALES INFORMATIQUE',
      'Vision commune & Opportunités de collaboration',
      'Analyse du Marché marocain & africain'
    ],
    tips: [
      'Slide "Pourquoi le Maroc est stratégique"',
      'Comparatif marché France / Maroc'
    ],
    icon: 'Briefcase'
  },
  {
    id: '3',
    title: 'Pause culturelle & storytelling',
    duration: '30 min',
    objective: 'Créer un lien émotionnel',
    actions: [
      'Mini présentation : "Le Maroc en 10 minutes"',
      'Focus sur l’Hospitalité et la Business Culture'
    ],
    tips: [
      'Support visuel riche en photos authentiques'
    ],
    icon: 'Globe'
  },
  {
    id: '4',
    title: 'Déjeuner / expérience locale',
    duration: '1h',
    objective: 'Expérience mémorable',
    actions: [
      'Restaurant marocain authentique ou déjeuner chic',
      'Dégustation (Couscous, Tajine, Pastilla)',
      'Explication des saveurs et traditions'
    ],
    tips: [
      'Réserver une table calme propice à l’échange'
    ],
    icon: 'Utensils'
  },
  {
    id: '5',
    title: 'Moment contenu & communication',
    duration: '25 min',
    objective: 'Valorisation & marketing',
    actions: [
      'Photos professionnelles',
      'Vidéo courte : "Partenariat France – Maroc"',
      'Interview : Impressions sur le Maroc'
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
    objective: 'Laisser une trace positive',
    actions: [
      'Remise d’un cadeau artisanal élégant',
      'Petit mot : "Merci pour cette collaboration. Bienvenue au Maroc."'
    ],
    tips: [
      'Coffret thé premium ou maroquinerie locale'
    ],
    icon: 'Gift'
  }
];
