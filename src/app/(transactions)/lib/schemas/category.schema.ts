import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  emoji: z.string().emoji(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const createCategorySchema = categorySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true
})

export const editCategorySchema = categorySchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true
})

export type Category = z.infer<typeof categorySchema>
export type EditCategory = z.infer<typeof editCategorySchema>
export type CreateCategory = z.infer<typeof createCategorySchema>
