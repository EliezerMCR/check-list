import type { Data } from '../types';

export const mockData: Data = {
  lists: [
    {
      slug: 'compras-supermercado',
      title: 'Compras Supermercado',
      created_at: new Date('2026-01-15'),
      items: [
        { message: 'Leche', done: true, created_at: new Date('2026-01-15') },
        { message: 'Pan', done: true, created_at: new Date('2026-01-15') },
        { message: 'Huevos', done: false, created_at: new Date('2026-01-16') },
        { message: 'Café', done: false, created_at: new Date('2026-01-16') },
        { message: 'Café', done: false, created_at: new Date('2026-01-16') },
        { message: 'Café', done: false, created_at: new Date('2026-01-16') },
        { message: 'Café', done: false, created_at: new Date('2026-01-16') },
      ],
    },
    {
      slug: 'tareas-del-trabajo',
      title: 'Tareas del Trabajo',
      created_at: new Date('2026-01-20'),
      items: [
        { message: 'Revisar emails', done: false, created_at: new Date('2026-01-20') },
        { message: 'Llamar cliente', done: false, created_at: new Date('2026-01-20') },
        { message: 'Actualizar docs', done: false, created_at: new Date('2026-01-21') },
        { message: 'Code review', done: false, created_at: new Date('2026-01-21') },
        { message: 'Standup meeting', done: false, created_at: new Date('2026-01-22') },
      ],
    },
    {
      slug: 'proyecto-personal',
      title: 'Proyecto Personal',
      created_at: new Date('2026-01-25'),
      items: [
        { message: 'Diseñar mockups', done: true, created_at: new Date('2026-01-25') },
        { message: 'Configurar repo', done: true, created_at: new Date('2026-01-26') },
        { message: 'Implementar UI', done: true, created_at: new Date('2026-01-27') },
        { message: 'Escribir tests', done: false, created_at: new Date('2026-01-28') },
        { message: 'Deploy a producción', done: false, created_at: new Date('2026-01-29') },
      ],
    },
  ],
};
