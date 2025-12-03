import type { Project } from '../components/ProjectCard/ProjectCard';

export const projectsBase: Omit<Project, 'title' | 'subtitle' | 'imageAlt'>[] = [
  {
    id: 'pascal',
    imageSrc: '/images/lacavedepascal.png',
    URL: 'https://la-cave-de-pascal.vercel.app/'
  },
  {
    id: 'nectar',
    imageSrc: '/images/nectar.png',
    URL: 'https://nectar-wine-merchant.vercel.app/'
  },
  {
    id: 'brunch',
    imageSrc: '/images/cannelle.png',
    URL: 'https://johan11683.github.io/Cannelle-Brunch/'
  }
];
