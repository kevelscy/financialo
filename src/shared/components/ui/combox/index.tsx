//@ts-ignore
//@ts-nocheck

import { UseFormReturn } from 'react-hook-form'
import { IconCheck } from '@tabler/icons-react'
import { ChevronsUpDown } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { cn } from '@/shared/lib/utils/tailwind'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { FormField, FormItem, FormLabel } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'
import { Button } from '@/ui/button'
import { Label } from '@/ui/label'

type TGenericComboxItem = {
  value: string
  label: string
  image?: string
  icon?: ReactNode
  disabled?: boolean
}

interface IGenericComboxProps {
  items: TGenericComboxItem[]
  ctaPlaceholder: string
  notFoundLabel: string
  id: string
  form: UseFormReturn<any>
  label: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  tabIndex?: number
  buttonClassName?: string
  popoverClassName?: string
  classNameGroup?: string
  isLoading?: boolean
}

export function GenericCombobox({
  id,
  form,
  label,
  items,
  disabled,
  tabIndex,
  isLoading,
  placeholder,
  defaultValue,
  notFoundLabel,
  classNameGroup,
  ctaPlaceholder,
  buttonClassName,
  popoverClassName
}: IGenericComboxProps) {
  const [open, setOpen] = useState(false)

  if (isLoading) {
    return (
      <div className={cn('w-full')}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        <div className='relative'>
          <Skeleton
            className={cn('w-full h-9 mt-2')}
          />
        </div>
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name={id}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel className='font-semibold'>{label}</FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                disabled={disabled}
                tabIndex={tabIndex}
                variant='outline'
                role='combobox'
                style={{ marginTop: 12 }}
                className={cn('w-min justify-between', !field.value && 'text-muted-foreground', `${buttonClassName}`)}
              >
                {
                  field.value
                    ? items.find((item) => item?.value?.toUpperCase() === field?.value?.toUpperCase())?.label
                    : ctaPlaceholder
                }
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>

            <PopoverContent className={cn('w-[200px] p-0', popoverClassName)}>
              <Command>
                <CommandInput placeholder={placeholder} className='h-9' />

                <CommandList>
                  <CommandEmpty>{notFoundLabel}</CommandEmpty>

                  <CommandGroup className={cn('overflow-auto', classNameGroup)}>
                    {
                      items.map((item) => (
                        <CommandItem
                          disabled={item?.disabled}
                          value={item.value}
                          key={item.value}
                          className={cn('w-full flex justify-start items-center', item?.disabled && 'pointer-events-none opacity-50 cursor-default')}
                          onSelect={(value) => {
                            form.setValue(id, value, { shouldDirty: true })
                            setOpen(false)
                          }}
                        >
                          {item?.image && <img src={item.image} alt={item.label} width={40} className='mr-2' />}
                          {item?.icon && item.icon}

                          {item.label}

                          <IconCheck
                            className={cn(
                              'ml-auto h-4 w-4',
                              item.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))
                    }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}
