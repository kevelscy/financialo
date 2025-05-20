'use client'

import { cn } from '@/shared/lib/utils/tailwind'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { TextareaFormProps } from '@/shared/lib/types/ui/textarea-form'
import { Skeleton } from '@/ui/skeleton'

import { Textarea } from './textarea'

export const TextareaForm = (props: TextareaFormProps) => {
  const { children, form, id, label, classNameContainer, description, loading, ...rest } = props

  if (loading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

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
            {label && <FormLabel className='font-semibold'>{label}</FormLabel>}
            <FormMessage className='text-xs font-normal' />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          <div className='relative'>
            <FormControl className={cn(label || description ? 'mt-2' : '')}>
              <Textarea
                {...field}
                {...rest}
                disabled={rest?.disabled}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  )
}
