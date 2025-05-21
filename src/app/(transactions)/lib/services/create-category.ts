import { QueryCategories } from '@/shared/lib/services/firebase/queries/categories'
import { Body } from '@/shared/lib/types/http'

import { Category, CreateCategory } from '../schemas/category.schema'

interface Props extends CreateCategory { }

export const createCategory = async (userId: string, payload: Props): Promise<Body<Category>> => {
  try {
    const res = await QueryCategories.create(userId, payload)
    return { result: res }
  } catch (error) {
    console.error('createCategory error', error)
    return null
  }
}