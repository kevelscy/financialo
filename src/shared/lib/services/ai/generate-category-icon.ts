export const generateCategoryIcon = async ({ categoryName }): Promise<{ emoji: string, color: string }> => {
  const request: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryName })
  }

  const res = await fetch('/api/ai/generate/category-icon', request)
  const data = await res.json()

  return data
}