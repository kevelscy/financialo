import { Table as ITable } from '@tanstack/react-table'
import React, { memo, useMemo } from 'react'

interface Props<TData> {
  table: ITable<TData>
  loading: boolean
  data: TData[]
  flexRender: any
  render?: React.ComponentType<{ items: TData[] }> | ((props: { items: TData[] }) => React.ReactNode)
}

export function DataManagerContent<TData>({
  data,
  table,
  loading,
  flexRender,
  render
}: Props<TData>) {

  const ComponentMemo = memo(render)

  const childrenProps = useMemo(() => {
    const rows = table?.getRowModel()?.rows ?? []
    return rows.map(row => row.original)
  }, [table?.getRowModel()?.rows])

  if (loading) return <div>Cargando</div>
  if (childrenProps.length === 0) return <div>Vacío</div>

  // Si es una función, invocarla
  if (typeof render === 'function') {
    return <>{ComponentMemo({ items: childrenProps })}</>
  }

  // Si es un componente
  if (render) {
    const Element = ComponentMemo
    return <Element items={childrenProps} />
  }

  return null
}
