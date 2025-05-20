import { Filter } from 'lucide-react'
import { useId } from 'react'

import { useMediaQuery } from '@/shared/lib/hooks/use-media-query'
import { cn } from '@/shared/lib/utils/tailwind'

import { Drawer, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger, DrawerContent } from '@/ui/drawer'
import { Sheet, SheetHeader, SheetTitle, SheetFooter, SheetTrigger, SheetContent } from '@/ui/sheet'
import { Separator } from '@/ui/separator'
import { Checkbox } from '@/ui/checkbox'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export const DataManagerFilters = ({ columns, tempFilters, setTempFilters, tempSearch, setTempSearch, open, setOpen, setOpenFilters, onSubmit }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const filterColumns = columns.filter((col) => col.filters && col.filters.length > 0)
  const queryColumns = columns.filter((col) => col.isQuery)

  const FilterContainer = isDesktop ? Sheet : Drawer
  const FilterTitle = isDesktop ? SheetTitle : DrawerTitle
  const FilterHeader = isDesktop ? SheetHeader : DrawerHeader
  const FilterFooter = isDesktop ? SheetFooter : DrawerFooter
  const FilterTrigger = isDesktop ? SheetTrigger : DrawerTrigger
  const FilterContainerContent = isDesktop ? SheetContent : DrawerContent

  const handleApply = () => {
    onSubmit()
  }

  const handleClose = () => {
    setOpenFilters(false)
  }

  // const handleClearFilters = () => {
  //   setTempFilters({})
  //   setTempSearch({})

  //   onSubmit()
  //   setOpenFilters(false)
  // }

  return (
    <div className='flex items-center justify-between py-4'>
      <FilterContainer open={open} onOpenChange={setOpen}>
        <FilterTrigger asChild>
          <Button variant='outline'>
            <Filter size={20} />
            Mostrar filtros
          </Button>
        </FilterTrigger>

        <FilterContainerContent className={cn(isDesktop ? 'max-w-sm px-4' : 'w-full px-4')} side='left'>
          <FilterHeader className='w-full text-left space-y-4 px-0 pb-0 pt-4'>
            <FilterTitle>Filtros</FilterTitle>
          </FilterHeader>

          <Separator className='w-full my-4' />

          <section className={cn(isDesktop ? 'w-full h-[70svh]' : 'w-full h-full max-h-[50svh] overflow-y-auto')}>
            <div className='grid grid-cols-2 gap-4'>
              {
                queryColumns?.map?.((column) => {
                  const id = useId()

                  return (
                    <div key={id}>
                      <Label className='text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                        {column.label}
                      </Label>

                      <Input
                        placeholder={`Ingrese ${column.label.toLowerCase()}`}
                        className='mt-2'
                        value={tempSearch[column?.id as string] || ''}
                        onChange={(e) =>
                          setTempSearch((prev) => ({
                            ...prev,
                            [column?.id as string]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )
                })
              }
            </div>

            <Separator className='w-full my-4' />

            <div className='space-y-4'>
              {
                filterColumns?.map?.((column) => {
                  const id = useId()

                  return (
                    <div key={id} className='space-y-2'>
                      <span className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold'>
                        {column.label}
                      </span>

                      <div className='flex flex-col items-start justify-start'>
                        {
                          column.filters!.map((filter) => (
                            <label
                              htmlFor={`${column.id as string}-${filter.id}`}
                              className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full hover:bg-muted px-2 py-3 flex justify-between items-center cursor-pointer rounded-md'
                            >
                              {filter.label}

                              <Checkbox
                                id={`${column.id as string}-${filter.id}`}
                                checked={tempFilters[column.id as string]?.includes(filter.value)}
                                onCheckedChange={(checked) => {
                                  setTempFilters((prev) => {
                                    const currentFilters = prev[column.id as string] || []
                                    if (checked) {
                                      return {
                                        ...prev,
                                        [column.id as string]: [...currentFilters, filter.value],
                                      }
                                    } else {
                                      return {
                                        ...prev,
                                        [column.id as string]: currentFilters.filter((v) => v !== filter.value),
                                      }
                                    }
                                  })
                                }}
                              />
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </section>

          <Separator className='w-full my-4' />

          <FilterFooter className='w-full flex flex-row justify-between items-end px pb-4 pt-0'>
            <Button className='w-full' variant='outline' onClick={handleClose}>
              Cerrar
            </Button>

            {/* <Button className='w-full' variant='outline' onClick={handleClearFilters}>
              Limpiar
            </Button> */}

            <Button className='w-full' onClick={handleApply}>
              Aplicar
            </Button>
          </FilterFooter>
        </FilterContainerContent>
      </FilterContainer>

      {/* <Button onClick={onSubmit}>
        <Search size={20} />
        Buscar
      </Button> */}
    </div>
  )
}