'use client'

import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/shared/lib/utils/tailwind'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Skeleton } from '@/ui/skeleton'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'

export type SelectItem = {
  value: string
  label: string
}

interface MultiSelectSearchableFormProps {
  form: UseFormReturn<any>
  id: string
  items: SelectItem[]
  onSearch: (value: string) => void
  loading?: boolean
  label?: string
  placeholder?: string
  description?: string
  className?: string
  maxDisplayItems?: number
  debounceTime?: number
}

// Componente memoizado para prevenir re-renders innecesarios
const MemoCommandItem = memo(({ item, selectedValues, toggleValue }: {
  item: SelectItem
  selectedValues: string[]
  toggleValue: (value: string) => void
}) => (
  <CommandItem
    key={item.value}
    value={item.value}
    onSelect={() => toggleValue(item.value)}
  >
    <Check
      className={cn(
        'mr-2 h-4 w-4',
        selectedValues.includes(item.value)
          ? 'opacity-100'
          : 'opacity-0'
      )}
    />
    {item.label}
  </CommandItem>
))

export function MultiSelectSearchableForm({
  form,
  id,
  items,
  onSearch,
  loading = false,
  label,
  placeholder = 'Seleccione al menos una opción',
  description,
  className,
  maxDisplayItems = 3,
  debounceTime = 500
}: MultiSelectSearchableFormProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const itemsCache = useRef<Map<string, SelectItem>>(new Map())
  const [comboxWidth, setComboxWidth] = useState(null)
  const elementRef = useRef(null)

  // Obtener valores seleccionados de forma óptima
  const selectedValues = form.getValues(id) || []

  // Cache de items con memoización
  useEffect(() => {
    const newCache = new Map(itemsCache.current)
    items.forEach(item => {
      if (!newCache.has(item.value)) {
        newCache.set(item.value, item)
      }
    })
    itemsCache.current = newCache
  }, [items])

  // Memoizar mergedItems para prevenir cálculos innecesarios
  const mergedItems = useMemo(() =>
    Array.from(itemsCache.current.values()).filter(item =>
      items.some(i => i.value === item.value) ||
      selectedValues.includes(item.value)
    ), [items, selectedValues]
  )

  // Memoizar selectedItems
  const selectedItems = useMemo(() =>
    selectedValues
      .map((value: string) => itemsCache.current.get(value))
      .filter(Boolean) as SelectItem[]
    , [selectedValues])

  // Validación optimizada
  useEffect(() => {
    const validValues = selectedValues.filter((value: string) =>
      itemsCache.current.has(value)
    )

    if (validValues.length !== selectedValues.length) {
      form.setValue(id, validValues)
    }
  }, [mergedItems]) // Solo se ejecuta cuando cambian los mergedItems

  // Búsqueda memoizada
  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value)
      timeoutRef.current && clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => onSearch(value), debounceTime)
    },
    [onSearch, debounceTime]
  )

  // Toggle memoizado
  const toggleValue = useCallback((value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v: string) => v !== value)
      : [...selectedValues, value]

    form.setValue(id, newValues, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }, [selectedValues, form, id])

  // Limpieza de efectos
  useEffect(() => () => {
    timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [])

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

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className={cn('w-full space-y-0', className)}>
          {label && <FormLabel className='font-semibold'>{label}</FormLabel>}
          <FormMessage className='text-xs font-normal' />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl className={cn(label || description ? 'mt-2' : '')}>
                <Button
                  ref={elementRef}
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between h-auto min-h-10',
                    !field.value?.length && 'text-muted-foreground'
                  )}
                  disabled={loading}
                >
                  <div className='flex flex-wrap gap-1 flex-1'>
                    {loading ? (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    ) : selectedItems.length > 0 ? (
                      <>
                        {selectedItems.slice(0, maxDisplayItems).map((item) => (
                          <Badge
                            key={item.value}
                            variant='secondary'
                            className='flex items-center gap-1'
                          >
                            {item.label}
                            {/* <X
                              className='h-3 w-3 cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleValue(item.value)
                              }}
                            /> */}
                          </Badge>
                        ))}
                        {selectedItems.length > maxDisplayItems && (
                          <Badge variant='secondary'>
                            +{selectedItems.length - maxDisplayItems}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <div className='truncate'>
                        <span>{placeholder}</span>
                      </div>
                    )}
                  </div>
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <style>
              {`
                .combox-checkbox-content {
                    min-width: 150px !important;
                    width: ${comboxWidth + 34}px !important;
                  }

                  .checkbox-tooltip-content {
                    min-width: 150px !important;
                    width: ${comboxWidth + 10}px !important;
                  }
                `}
            </style>

            <PopoverContent className='w-full p-0 combox-checkbox-content' align='start'>
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder='Buscar...'
                  value={searchValue}
                  onValueChange={handleSearch}
                />

                {loading ? (
                  <div className='p-2'>
                    <Skeleton className='h-8 w-full rounded-md' />
                    <Skeleton className='h-8 w-full mt-2 rounded-md' />
                    <Skeleton className='h-8 w-full mt-2 rounded-md' />
                  </div>
                ) : (
                  <CommandList>
                    <CommandEmpty>Sin resultados</CommandEmpty>
                    <CommandGroup>
                      {mergedItems.map((item) => (
                        <MemoCommandItem
                          key={item.value}
                          item={item}
                          selectedValues={selectedValues}
                          toggleValue={toggleValue}
                        />
                      ))}
                    </CommandGroup>
                  </CommandList>
                )}
              </Command>
            </PopoverContent>
          </Popover>

          {
            description && (
              <div>
                <div className='mt-1' />
                <FormDescription>{description}</FormDescription>
              </div>
            )
          }
        </FormItem>
      )}
    />
  )
}