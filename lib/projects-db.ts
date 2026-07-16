// lib/projects-db.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'My First Open Source Contribution',
    description: 'A bug fix contributed to a popular library.',
    type: 'opensource',
    technologies: ['TypeScript', 'React'],
    link: 'https://github.com/nrb2002/wdd430-portfolio'
  },
  {
    id: 2,
    title: 'Database Design Final Project',
    description: 'An ER diagram and normalized schema for a library system.',
    type: 'school',
    technologies: ['PostgreSQL', 'SQL']
  },

  {
    id: 3,
    title: 'TikCat Event Ticketing API',
    description: 'A RESTful API for managing events, venues, tickets, users, and orders using Node.js and MongoDB.',
    type: 'opensource',
    technologies: [
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Swagger',
      'JWT',
    ],
    link: 'https://github.com/nrb2002/tikcat-api',
  },
  {
    id: 4,
    title: 'FountTechs API',
    description:
      'A RESTful API for managing a collection of technologies, allowing users to perform CRUD operations on technology data.',
    type: 'opensource',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Vite',
    ],
    link: 'https://github.com/nrb2002/FountTechs-API',
  },
];


export function getProjects(type?: string | null): Project[] {
  if (type) return projects.filter(p => p.type === type);
  return projects;
}

export function getProjectById(id: number): Project | null {
  return projects.find(p => p.id === id) ?? null;
}
