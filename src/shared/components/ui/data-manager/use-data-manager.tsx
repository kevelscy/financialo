import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { FetchParams, Pagination } from '@/shared/lib/types/http'
import { DataProperty, DataTableProps } from './types'

import { Checkbox } from '@/ui/checkbox'

export function useDataManager<TData>({ columns, data, loading, pagination, selection = false, onSubmit }: DataTableProps<TData>) {
  const [localPagination, setLocalPagination] = useState<Partial<Pagination>>(null)
  const [localSearch, setLocalSearch] = useState<Record<string, string>>({})
  const [localFilters, setLocalFilters] = useState<Record<string, any>>({})
  const [selectedRows, setSelectedRows] = useState<TData[]>([])
  const [openFilters, setOpenFilters] = useState(false)

  const tableColumns: ColumnDef<TData>[] = useMemo(() => [
    ...(selection
      ? [
        {
          id: 'select',
          header: ({ table }) => (
            <Checkbox
              checked={table.getRowModel().rows.length > 0 && selectedRows.length === table.getRowModel().rows.length}
              onCheckedChange={(value) => {
                if (value) {
                  setSelectedRows(data)
                } else {
                  setSelectedRows([])
                }
              }}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={selectedRows.some((item) => JSON.stringify(item) === JSON.stringify(row.original))}
              onCheckedChange={(value) => {
                setSelectedRows((prev) => {
                  if (value) {
                    return [...prev, row.original]
                  } else {
                    return prev.filter((item) => JSON.stringify(item) !== JSON.stringify(row.original))
                  }
                })
              }}
            />
          ),
        },
      ]
      : []),
    ...columns.map((column) => ({
      accessorKey: column.id as string,
      header: column.label,
      cell: column.render
        ? ({ row }) => column.render!(row.original as DataProperty<TData>)
        : ({ row }) => row.getValue(column.id as string),
    })),
  ], [columns, selectedRows])

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const onSubmitLocal = useCallback((params: FetchParams) => onSubmit(params), [onSubmit])

  const onSubmitWithPersistence = () => {
    // Remove the keys into localFilters that have a value as empty string, as they are not valid filters
    Object.keys(localSearch).forEach((key) => localSearch[key] === '' && delete localSearch[key])

    onSubmitLocal({
      pagination: {
        page: localPagination.page || 1,
        limit: localPagination.limit || 10,
      },
      search: localSearch,
      filters: localFilters,
      // selectedRows: selection ? selectedRows : undefined,
    })
  }

  useEffect(() => setLocalPagination({ ...pagination, page: pagination?.page || 1 }), [pagination])

  return {
    data,
    pagination,
    selection,
    table,
    columns,
    loading,
    selectedRows,
    setSelectedRows,
    openFilters,
    setOpenFilters,
    localSearch,
    setLocalSearch,
    localFilters,
    setLocalFilters,
    localPagination,
    setLocalPagination,
    onSubmitWithPersistence,
    onSubmitLocal,
  }
}