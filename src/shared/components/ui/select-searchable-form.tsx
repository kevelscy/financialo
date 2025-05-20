import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/shared/lib/utils/tailwind'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Skeleton } from '@/ui/skeleton'
import { Button } from '@/ui/button'

export type SelectItem = {
  value: string
  label: string
}

interface SelectSearchableFormProps {
  form: UseFormReturn<any>
  id: string
  items: SelectItem[]
  onSearch: (value: string) => void
  loading?: boolean
  label?: string
  placeholder?: string
  description?: string
  className?: string
  disabled?: boolean
  debounceTime?: number
  tabIndex?: number
}

export function SelectSearchableForm({
  form,
  id,
  items,
  onSearch,
  loading = false,
  label,
  placeholder = 'Seleccione una opción',
  description,
  className,
  disabled,
  tabIndex,
  debounceTime = 500
}: SelectSearchableFormProps) {
  const [open, setOpen] = useState(false)
  const [comboxWidth, setComboxWidth] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout>(null)
  const currentValue = form.watch(id)
  const elementRef = useRef(null)

  // Memoizar la lista de items usando una referencia
  const itemsMap = useRef<Map<string, string>>(new Map())
  useEffect(() => {
    itemsMap.current = new Map(items.map(item => [item.value, item.label]))
  }, [items])

  // Validar valor actual cuando cambian los items
  useEffect(() => {
    if (currentValue && !itemsMap.current.has(currentValue)) {
      form.resetField(id)
    }
  }, [currentValue, items, id, form])

  // Manejador de búsqueda con debounce
  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        onSearch?.(value)
      }, debounceTime)
    },
    [onSearch, debounceTime]
  )

  // Limpieza de timeout al desmontar
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
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
          <FormMessage />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl className={cn(label || description ? 'mt-2' : '')}>
                <Button
                  ref={elementRef}
                  variant='outline'
                  tabIndex={tabIndex}
                  role='combobox'
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between truncate',
                    !field.value && 'text-muted-foreground'
                  )}
                  disabled={loading || disabled}
                >
                  {loading ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    itemsMap.current.get(field.value) || placeholder
                  )}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <style>
              {`
                .combox-checkbox-content {
                    min-width: 150px !important;
                    width: ${comboxWidth + 28}px !important;
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
                      {items.map((item) => (
                        <CommandItem
                          key={item.value}
                          value={item.value}
                          onSelect={() => {
                            form.setValue(id, item.value, {
                              shouldValidate: true,
                              shouldDirty: true,
                              shouldTouch: true
                            })
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              item.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {item.label}
                        </CommandItem>
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