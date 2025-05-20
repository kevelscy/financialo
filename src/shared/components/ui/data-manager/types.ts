import type { ReactNode } from 'react'

import { FetchParams, Pagination } from '@/shared/lib/types/http'

export interface ITableFilterOption {
  id: string
  label: string
  value: string | boolean | number
  icon?: ReactNode
  selected?: boolean
}

export type DataProperty<Type> = {
  [Property in keyof Type as Exclude<Property, '__typename'>]: Type[Property]
}

export interface ITableColumn<TDataSchema> {
  id: keyof DataProperty<TDataSchema> | 'actions' | 'select' | 'multi-select'
  label: string
  filters?: ITableFilterOption[]
  isQuery?: boolean
  render?: (item: DataProperty<TDataSchema>) => ReactNode
}

export type DataTableSubmit = (params: FetchParams) => Promise<void>

export interface DataTableProps<TData> {
  columns?: ITableColumn<TData>[]
  render?: React.ComponentType<{ items: any }> | ((props: { items: any }) => React.ReactNode)
  data: TData[]
  loading: boolean
  pagination: Omit<Pagination, 'totalCount' | 'hasNextPage' | 'hasPrevPage'>
  selection?: boolean
  onSubmit: DataTableSubmit
  hideFilters?: boolean
  hidePagination?: boolean
}
