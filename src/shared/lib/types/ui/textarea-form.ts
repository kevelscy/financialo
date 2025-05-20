import { TextareaHTMLAttributes } from 'react'

export interface TextareaFormProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'form' | 'type'> {
  id: string
  form: any
  rest?: any
  label?: string
  classNameContainer?: string
  description?: string
  loading?: boolean
}
