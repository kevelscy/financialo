'use client'

import { type ReactNode, type HTMLAttributes, useRef, useEffect, useState } from 'react'
import { Path, UseFormReturn } from 'react-hook-form'

import { cn } from '@/shared/lib/utils/tailwind'

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/ui/select'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'
import { Plus } from 'lucide-react'

export interface ISelectItem {
  label: string
  icon?: ReactNode
  value: boolean | string | number
  description?: string
  disabled?: boolean
}

export interface IGenericSelectProps<TForm> extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  placeholder?: string
  tabIndex?: number
  items: ISelectItem[]
  id: Path<TForm>
  form: UseFormReturn<TForm, any, any>
  label?: string
  classNameContainer?: string
  classNameSelect?: string
  classNameGroup?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  onAdd?: () => void
}

export function SelectForm<TForm = any>({
  id,
  label,
  placeholder,
  description,
  items,
  form,
  tabIndex,
  classNameContainer,
  onAdd,
  classNameSelect,
  classNameGroup,
  disabled,
  loading
}: IGenericSelectProps<TForm>) {
  const selectRef = useRef<HTMLButtonElement>(null);
  const [elementWidth, setElementWidth] = useState<number | null>(null);

  useEffect(() => {
    if (selectRef?.current) {
      setElementWidth(selectRef.current.offsetWidth);
    }
  }, [selectRef?.current]);

  if (loading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

        <div className='relative'>
          <Skeleton className='w-full h-9 mt-2' />
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        .select-item-width {
          width: ${elementWidth}px !important;
        }
      `}</style>

      <FormField
        control={form.control}
        name={id}
        render={({ field, formState }) => (
          <FormItem className={cn('w-full space-y-0 gap-0', classNameContainer)}>
            <div className='flex flex-col justify-start items-start'>
              {label && <FormLabel className='font-semibold text-sm'>{label}</FormLabel>}
            </div>

            {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

            <Select
              onValueChange={(newValue) => newValue && field.onChange(newValue)}
              defaultValue={field.value}
              disabled={disabled}
              value={field?.value}
            >
              <FormControl className={cn(label || description ? 'mt-2' : '')}>
                <SelectTrigger
                  ref={selectRef}
                  disabled={disabled}
                  tabIndex={tabIndex}
                  className={cn(
                    'w-full [&_>_span]:truncate ',
                    field?.value ? '[&_>_span]:text-black' : '[&_>_span]:text-muted-foreground',
                    classNameSelect
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>

              <SelectContent className='select-item-width'>
                <SelectGroup className={cn('overflow-auto', classNameGroup)}>
                  {!items.length ? <div className='px-2 py-1 text-sm'>Sin Resultados</div> : null}

                  {
                    items.map(item => (
                      <SelectItem key={item.value?.toString()} value={item.value?.toString()} disabled={item?.disabled}>
                        <div className={cn('flex justify-center', item?.description ? 'items-start' : 'items-center')}>
                          {
                            item?.icon && (
                              <div className={cn('dark:text-white mr-2', item?.description ? 'mt-1' : '')}>
                                {item.icon}
                              </div>
                            )
                          }

                          <div className={cn('flex flex-col justify-start items-start')}>
                            {item.label}
                            {item?.description && <span className='text-xs text-muted-foreground'>{item?.description}</span>}
                          </div>
                        </div>
                      </SelectItem>
                    ))
                  }

                  {
                    onAdd && (
                      <div onClick={onAdd} className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 hover:bg-muted hover:text-primary">
                        <Plus size={20} />
                        Agregar
                      </div>
                    )
                  }
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormMessage className='text-xs font-normal mt-1' />
          </FormItem>
        )}
      />
    </>
  )
}
