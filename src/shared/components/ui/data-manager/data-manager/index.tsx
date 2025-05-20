import { flexRender } from '@tanstack/react-table'
import { DataTableProps } from '../types'

import { DataManagerContent } from './data-manager-content'
import { DataManagerPagination } from '../data-pagination'
import { DataManagerFilters } from '../data-filters'
import { useDataManager } from '../use-data-manager'

export function DataManager<TData>(props: DataTableProps<TData>) {
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

      <DataManagerContent
        data={props?.data}
        table={table}
        render={props?.render}
        loading={loading}
        flexRender={flexRender}
      />

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
    </div>
  )
}
