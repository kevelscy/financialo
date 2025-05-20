import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactElement } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'

export interface InputFormProps<TForm = any> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'type'> {
  id: Path<TForm>
  form: UseFormReturn<TForm, any, any>
  rest?: any
  label?: string
  classNameContainer?: string
  description?: string
  type?: HTMLInputTypeAttribute
  icon?: ReactElement
  iconDirection?: 'left' | 'right'
  loading?: boolean
}
