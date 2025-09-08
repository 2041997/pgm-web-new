export const API_ENDPOINTS = {
  USERS: '/api/users',
  AUTH: '/api/auth',
  POSTS: '/api/posts',
} as const

export const APP_CONFIG = {
  NAME: 'PGM Web New',
  VERSION: '1.0.0',
  DESCRIPTION: 'A Next.js application with TypeScript and TailwindCSS',
  AUTHOR: 'Your Name',
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const
