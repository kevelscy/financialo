import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactElement } from 'react'

export interface InputFormProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'type'> {
  id: string
  form: any
  rest?: any
  label?: string
  classNameContainer?: string
  description?: string
  type?: HTMLInputTypeAttribute
  icon?: ReactElement
  iconDirection?: 'left' | 'right'
  loading?: boolean
}
