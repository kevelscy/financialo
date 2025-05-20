//@ts-ignore
//@ts-nocheck

import { useState, useRef, useEffect, type ReactNode, useMemo } from 'react'
import { Check, CircleX, EyeOff } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { ComboxItem, ComboxItemExtended } from './types'
import { cn } from '@/shared/lib/utils/tailwind'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/ui/command'
import { FormDescription, FormField, FormItem, FormLabel } from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Button, buttonVariants } from '@/ui/button'
import { Badge } from '@/ui/badge'

interface CheckBoxFieldProps {
  colapsed?: boolean
  form: UseFormReturn<any, any, any>
  id: string
  description: string
  icon: ReactNode
  placeholder: string
  label: string
  tabIndex: number
  items: ComboxItem[]
  classNameContainer?: string
  classNamePopover?: string
  disabled?: boolean
  selectAllLabel?: string
}

export const CheckboxField = (props: CheckBoxFieldProps) => {
  const { form, id, description, icon, placeholder, label, tabIndex, selectAllLabel, items, classNameContainer, classNamePopover, disabled, colapsed } = props

  // Obtener los valores del formulario actualizados
  const selectedFormValues = form.watch(id) || []

  const formatItems = (item: ComboxItem): ComboxItemExtended => ({
    ...item,
    selected: selectedFormValues.includes(item.value)
  })

  const [itemsExtended, setItemsExtended] = useState<ComboxItemExtended[]>(items.map(formatItems))
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [comboxWidth, setComboxWidth] = useState(null)
  const [open, setOpen] = useState(false)
  const elementRef = useRef(null)

  const getSelectedItems = useMemo(() => {
    return itemsExtended.filter((item) => item.selected).map((item) => item.value)
  }, [itemsExtended])

  // Actualizar los items seleccionados en el formulario
  const updateFormValues = (updatedItems: ComboxItemExtended[]) => {
    const selectedValues = updatedItems.filter(item => item.selected).map(item => item.value)
    form.setValue(id, selectedValues, { shouldDirty: true })
  }

  const resetFilters = () => {
    const updatedItems = itemsExtended.map(item => ({ ...item, selected: false }))
    setItemsExtended(updatedItems)
    updateFormValues(updatedItems)
  }

  const selectItemFilter = (itemId: string, selected: boolean) => {
    const updatedItems = itemsExtended.map(item => {
      if (item.id === itemId) {
        return { ...item, selected }
      }
      return item
    })

    setItemsExtended(updatedItems)
    updateFormValues(updatedItems)

    // Verifica si todos los items están seleccionados para actualizar el estado de "select all"
    setIsSelectAll(updatedItems.every(item => item.selected))
  }

  const toggleSelectAllItems = () => {
    if (isSelectAll) {
      resetFilters()
      return setIsSelectAll(false)
    }

    setIsSelectAll(true)

    const updatedItems = itemsExtended.map(item => ({ ...item, selected: true }))
    setItemsExtended(updatedItems)
    updateFormValues(updatedItems)
  }

  const renderBadges = () => {
    if (!getSelectedItems.length) {
      return (
        <span className='text-muted-foreground text-sm font-normal'>
          {placeholder || 'Seleccione alguna opción'}
        </span>
      )
    }

    if (colapsed && getSelectedItems.length >= 2) {
      return (
        <Badge
          variant='secondary'
          className='rounded-sm px-1 font-normal'
        >
          {getSelectedItems.length} seleccionados
        </Badge>
      )
    }

    if (getSelectedItems.length > 0) {
      return (
        <>
          <Badge
            variant='secondary'
            className='rounded-sm px-1 font-normal lg:hidden'
          >
            {getSelectedItems.length} seleccionados
          </Badge>

          <div className='hidden space-x-1 lg:flex'>
            {
              getSelectedItems.length > 2
                ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {getSelectedItems.length} seleccionados
                  </Badge>
                )
                : (
                  itemsExtended
                    .filter((item) => item.selected)
                    .map((item) => {
                      return (
                        <Badge
                          variant='secondary'
                          key={item.value.toString()}
                          className='rounded-sm px-1 font-normal'
                        >
                          {item.label}
                        </Badge>
                      )
                    })
                )}
          </div>
        </>
      )
    }
  }

  useEffect(() => {
    const element = elementRef.current

    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setComboxWidth(width)
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.unobserve(element)
      resizeObserver.disconnect()
    }
  }, [])

  // Sincronizar itemsExtended con los valores seleccionados en el formulario
  useEffect(() => {
    const updatedItems = items.map(formatItems)
    setItemsExtended(updatedItems)

    // Verifica si todos los items están seleccionados para actualizar el estado de "select all"
    setIsSelectAll(updatedItems.every(item => item.selected))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Observa el cambio de los valores seleccionados
  // }, [selectedFormValues]) // Observa el cambio de los valores seleccionados

  return (
    <>
      <FormField
        control={form.control}
        name={id}
        render={({ field, formState }) => {
          return (
            <FormItem className={cn('w-full space-y-2', classNameContainer)}>
              <div className='flex justify-start items-end'>
                {label && <FormLabel className='flex'>{label}&nbsp;</FormLabel>}
                {formState?.errors[id]?.message && <span className='text-xs font-light text-destructive'>* {formState.errors[id].message as any}</span>}
              </div>

              {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild disabled={disabled}>
                  <Button
                    ref={elementRef}
                    type='button'
                    variant='outline'
                    size='sm'
                    disabled={disabled}
                    className='py-5 border w-full justify-start'
                    tabIndex={tabIndex}
                  >
                    {icon && icon}
                    {renderBadges()}
                  </Button>
                </PopoverTrigger>

                <style>
                  {`
                .combox-checkbox-content {
                    min-width: 150px !important;
                    width: ${comboxWidth + 24}px !important;
                  }

                  .checkbox-tooltip-content {
                    min-width: 150px !important;
                    width: ${comboxWidth + 10}px !important;
                  }
                `}
                </style>

                <PopoverContent
                  className={cn('w-full p-0 combox-checkbox-content', classNamePopover)}
                  align='start'
                >
                  <Command style={{ width: '50px !important' }}>
                    <CommandInput placeholder={label} />

                    <CommandList>
                      <CommandEmpty>Sin Resultados</CommandEmpty>

                      <CommandGroup>
                        <CommandItem onSelect={toggleSelectAllItems}>
                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelectAll
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <Check className={cn('h-4 w-4')} />
                          </div>

                          <span className='truncate'>{selectAllLabel || 'Seleccionar todos'}</span>
                        </CommandItem>

                        <CommandSeparator className='my-2' />

                        {
                          itemsExtended.map((item) => {
                            return (
                              <CommandItem
                                disabled={item?.disabled}
                                key={item.value.toString()}
                                onSelect={() => {
                                  selectItemFilter(item.id, !item.selected)
                                }}
                              >
                                <div
                                  className={cn(
                                    'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                    item.selected
                                      ? 'bg-primary text-primary-foreground'
                                      : 'opacity-50 [&_svg]:invisible'
                                  )}
                                >
                                  <Check className={cn('h-4 w-4')} />
                                </div>

                                {item.icon}

                                <span className='truncate'>{item.label}</span>
                              </CommandItem>
                            )
                          })
                        }
                      </CommandGroup>

                      <CommandSeparator className='my-1' />

                      <CommandGroup
                        className='[&_>_div]:flex [&_>_div]:w-full [&_>_div]:flex-row [&_>_div]:justify-between [&_>_div]:items-center [&_>_div]:gap-3'
                      >
                        {
                          getSelectedItems.length > 0 && (
                            <CommandItem
                              onSelect={() => {
                                form.setValue(id, [])
                                resetFilters()
                                setIsSelectAll(false)
                              }}
                              className={cn(buttonVariants({ variant: 'ghost' }), 'w-full aria-selected:bg-muted/50 h-fit py-1.5')}
                            >
                              <CircleX size={14} className='mr-2' />
                              Limpiar
                            </CommandItem>
                          )
                        }

                        <CommandItem
                          onSelect={() => setOpen(false)}
                          className={cn(buttonVariants({ variant: 'default' }), 'w-full aria-selected:text-white h-fit py-1.5 data-[selected=true]:bg-umia-green/90 data-[selected=true]:text-white disabled:opacity-50 bg-umia-green')}
                        >
                          <EyeOff size={14} className='mr-2' />
                          Cerrar
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormItem>
          )
        }}
      />
    </>
  )
}
