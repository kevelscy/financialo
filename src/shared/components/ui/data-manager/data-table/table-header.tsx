import { TableHead, TableHeader, TableRow } from '@/ui/table'

export const DataTableHeader = ({ table, flexRender }) => {
  return (
    <TableHeader className=' hover:bg-secondary'>
      {
        table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className='text-black p-4 first:rounded-tl-md last:rounded-tr-md'>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))
      }
    </TableHeader>
  )
}