import { Body } from '@/shared/lib/types/http'

import { QueryCategories } from '@/shared/lib/services/firebase/queries/categories'
import { Category } from '../schemas/category.schema'

export const getAllCategories = async (userId: string): Promise<Body<Category[]>> => {
  try {
    const res = await QueryCategories.getAll(userId)
    return { result: res }
  } catch (error) {
    console.error('getAllCategories error', error)
    return null
  }
}