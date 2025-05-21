import { Category } from '../schemas/category.schema'

export const defaultCategories: Omit<Category, 'id' | 'userId'>[] = [
  {
    name: 'Comer afuera',
    emoji: '🍔',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Ropa',
    emoji: '👖',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Trabajo',
    emoji: '💼',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Lujo',
    emoji: '💎',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]