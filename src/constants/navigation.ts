export const NAVIGATION = {
  dashboard: {
    label: 'Dashboard',
    path: '/',
    children: null,
  },
  movies: {
    label: 'Movies',
    path: '/media/movies',
    children: {
      popular: { label: 'Populares', path: '/popular' },
      'top-rated': { label: 'Mejor valoradas', path: '/top-rated' },
      upcoming: { label: 'Próximamente', path: '/upcoming' },
      'now-playing': { label: 'En cines', path: '/now-playing' },
    },
  },
  series: {
    label: 'Series',
    path: '/media/series',
    children: {
      popular: { label: 'Populares', path: '/popular' },
      'top-rated': { label: 'Mejor valoradas', path: '/top-rated' },
      'now-playing': { label: 'En emisión', path: '/now-playing' },
    },
  },
  person: {
    label: 'Persons',
    path: '/person',
    children: null,
  },
} as const;
