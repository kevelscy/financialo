'use client'

import { Eye, EyeOff } from 'lucide-react'
import * as React from 'react'

import { validateInputIconClassNames } from '@/shared/lib/utils/ui/validate-input-icon-classnames'
import { InputFormProps } from '@/shared/lib/types/ui/input'
import { cn } from '@/shared/lib/utils/tailwind'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Skeleton } from '@/ui/skeleton'
import { Input } from './input'

export const InputSecret = ({ id, form, label, description, icon, iconDirection = 'left', classNameContainer, loading, ...rest }: InputFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false)

  if (loading) {
    return (
      <div className={cn('w-full', classNameContainer)}>
        <div className='flex justify-start items-end'>
          {label && <Skeleton className='h-5 w-full max-w-[90px]' />}
        </div>

        {description && <Skeleton className='h-5 w-full max-w-[150px] my-2' />}

        <div className='relative'>
          <Skeleton
            className={cn(validateInputIconClassNames({ iconDirection, icon, type: rest.type }), 'w-full h-9 mt-2')}
          />
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
            <FormMessage />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          <FormControl className={cn(label || description ? 'mt-2' : '')}>
            <div className='relative'>
              {
                (iconDirection === 'left' && icon) && (
                  <div className='absolute top-0.5 inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10 text-umia-green'>
                    {icon}
                  </div>
                )
              }

              <Input
                {...field}
                {...rest}
                disabled={rest?.disabled}
                className={cn(validateInputIconClassNames({ iconDirection, icon, type: rest.type }), rest.className)}
                type={showPassword ? 'text' : 'password'}
              />

              {
                (iconDirection === 'right' && icon) && (
                  <div className='absolute z-10 top-1 inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-umia-green'>
                    {icon}
                  </div>
                )
              }

              <div className='absolute inset-y-0 right-0 flex items-center pr-3 z-10 text-umia-green'>
                <button
                  type='button'
                  tabIndex={-1}
                  className='cursor-pointer'
                  onClick={() => setShowPassword(prevState => !prevState)}
                >
                  {
                    showPassword
                      ? <Eye size={18} />
                      : <EyeOff size={18} />
                  }
                </button>
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
