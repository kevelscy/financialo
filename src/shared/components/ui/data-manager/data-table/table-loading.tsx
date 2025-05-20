import { TableCell, TableRow } from '@/ui/table'

export const DataTableLoading = () => {
  return (
    <TableRow>
      <TableCell className='px-4 py-10 text-center' colSpan={7}>
        <div className='w-full flex flex-col justify-center items-center'>
          <img src='/media/images/logo.svg' className='w-20 mb-1' />
          <span className='font-semibold'>Cargando</span>
        </div>
      </TableCell>
    </TableRow>
  )
}