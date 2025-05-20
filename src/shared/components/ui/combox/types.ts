import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'

export interface ComboxItem {
  id: string
  label: string
  value: string
  icon?: ReactNode
  disabled?: boolean
}

export interface ComboxItemExtended extends ComboxItem {
  selected: boolean
}

export interface ComboxCheckBoxPropsBase {
  id: string
  label?: string
  placeholder?: string
  description?: string
  icon?: ReactNode
  colapsed?: boolean
  classNameContainer?: string
  tabIndex?: number
  disabled?: boolean
  classNamePopover?: string
  selectAllLabel?: string
}

export interface ComboxCheckBoxReadOnly extends ComboxCheckBoxPropsBase {
  readOnly: true
  items: ComboxItem[]
}

export interface ComboxCheckBoxWithForm extends ComboxCheckBoxPropsBase {
  form: UseFormReturn<Record<string, unknown>, unknown, unknown>
  items: ComboxItem[]
  readOnly?: false
}

export type ComboxCheckBoxProps =
  | ComboxCheckBoxReadOnly
  | ComboxCheckBoxWithForm
