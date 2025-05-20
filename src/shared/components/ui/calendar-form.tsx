import { Path, UseFormReturn } from 'react-hook-form'
import { CalendarIcon } from 'lucide-react'
import { es } from 'date-fns/locale'
import { format } from 'date-fns'

import { cn } from '@/shared/lib/utils/tailwind'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Calendar } from './calendar'
import { Button } from './button'

export interface Props<TForm = any> {
  id: Path<TForm>
  form: UseFormReturn<TForm, any, any>
  rest?: any
  label?: string
  classNameContainer?: string
  description?: string
  placeholder?: string
  disabled?: boolean
}


export function CalendarForm<TForm>(props: Props<TForm>) {
  const { id, placeholder, form, label, description, disabled, classNameContainer } = props

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className={cn('w-full space-y-0 gap-0', classNameContainer)}>
          <div className='flex flex-col justify-start items-start'>
            {label && <FormLabel className='font-semibold text-sm'>{label}</FormLabel>}
          </div>
          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}


          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  disabled={disabled}
                  className={cn(
                    'w-full pl-3 text-left font-normal justify-start',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='h-4 w-4 opacity-50' />
                  {field.value ? (
                    format(field.value, 'PPP', { locale: es })
                  ) : (
                    <span>{placeholder || 'Seleccione una fecha'}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage className='text-xs font-normal mt-1' />
        </FormItem>
      )}
    />
  )
}