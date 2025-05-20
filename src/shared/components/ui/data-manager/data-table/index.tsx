import { flexRender } from '@tanstack/react-table'
import { DataTableProps } from '../types'

import { DataManagerPagination } from '../data-pagination'
import { DataManagerFilters } from '../data-filters'
import { DataTableContent } from './table-content'
import { useDataManager } from '../use-data-manager'

export function DataTable<TData>(props: DataTableProps<TData>) {
  const {
    selection,
    table,
    columns,
    loading,
    selectedRows,
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
  } = useDataManager(props)

  return (
    <div>
      {
        !props?.hideFilters && (
          <DataManagerFilters
            columns={columns}
            open={openFilters}
            tempSearch={localSearch}
            setOpen={setOpenFilters}
            tempFilters={localFilters}
            setTempSearch={setLocalSearch}
            setTempFilters={setLocalFilters}
            setOpenFilters={setOpenFilters}
            onSubmit={onSubmitWithPersistence}
          />
        )
      }

      <div className='rounded-t-md border'>
        <DataTableContent
          table={table}
          loading={loading}
          flexRender={flexRender}
        />
      </div>


      {
        !props?.hideFilters && (
          <DataManagerPagination
            loading={loading}
            onSubmit={onSubmitLocal}
            selectedRows={selectedRows}
            selection={selection}
            tempSearch={localSearch}
            tempFilters={localFilters}
            pagination={localPagination}
            setLocalPagination={setLocalPagination}
          />
        )
      }
    </div>
  )
}
