// /data/projects.data.ts

import type { Project } from '../components/ProjectCard/ProjectCard';

export const projects: Project[] = [
  {
    id: 'pascal',
    title: 'La Cave de Pascal',
    subtitle: 'Caviste premium',
    imageSrc: '/images/lacavedepascal.png',
    imageAlt: 'Aperçu du site La Cave de Pascal',
    URL : 'https://la-cave-de-pascal.vercel.app/'
  },

  {
    id: 'nectar',
    title: 'Nectar Wine Merchant',
    subtitle: 'Négociant de grands vins',
    imageSrc: '/images/nectar.png',
    imageAlt: 'Aperçu du site Nectar Wine Merchant',
    URL : 'https://nectar-wine-merchant.vercel.app/'
  },

  {
    id: 'brunch',
    title: 'Cannelle Brunch',
    subtitle: 'Livraison de Brunch faits maison à domicile',
    imageSrc: '/images/cannelle.png',
    imageAlt: 'Aperçu du site Cannelle Brunch',
    URL : 'https://johan11683.github.io/Cannelle-Brunch/'
  },

];
