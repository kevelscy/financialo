import { cn } from '@/shared/lib/utils/tailwind'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'

import { Switch } from './switch'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  id: string
  form: UseFormReturn<any>
  label?: string
  description?: string
  disabled?: boolean
  loading?: boolean
  classNameContainer?: string
  className?: string
  labelPosition?: 'top' | 'right'
  align?: 'left' | 'right'
}

export const SwitchForm = (props: Props) => {
  const { form, id, label, classNameContainer, description, loading, labelPosition = 'top', align = 'left', ...rest } = props

  if (loading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[50px] my-2' />}

        <div className='relative'>
          <Skeleton className='w-full h-16 mt-2' />
        </div>
      </div>
    )
  }

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem className={cn('w-full space-y-0', classNameContainer)}>
          <div className='flex flex-col justify-start items-start'>
            {
              labelPosition === 'top' &&
              label &&
              <FormLabel className='font-semibold'>{label}</FormLabel>
            }

            <FormMessage className='text-xs font-normal' />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          <div className={cn(
            'relative',
            align === 'right' && 'flex justify-end',
            labelPosition === 'right' && 'flex items-end gap-2',
          )}
          >
            <FormControl className={cn(label || description ? 'mt-2' : '')}>
              <Switch
                {...field}
                {...rest}
                disabled={rest?.disabled}
                className={cn('cursor-pointer', rest?.className)}
              />
            </FormControl>

            {
              labelPosition === 'right' && label && <FormLabel className='font-semibold'>{label}</FormLabel>
            }
          </div>
        </FormItem>
      )}
    />
  )
}
