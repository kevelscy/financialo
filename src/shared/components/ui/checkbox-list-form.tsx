import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Checkbox } from '@/ui/checkbox'

import { cn } from '@/shared/lib/utils/tailwind'

interface Props {
  form: any
  id: string
  label?: string
  description?: string
  className?: string
  items?: { id: string, label: string }[]
}

export const CheckboxListForm = (props: Props) => {
  const { form, id, label, description, className, items } = props

  return (
    <FormField
      control={form.control}
      name={id}
      render={() => (
        <FormItem className={cn('w-full space-y-0')}>
          <div className='flex flex-col justify-start items-start'>
            {label && <FormLabel className='font-semibold text-sm'>{label}</FormLabel>}
            <FormMessage className='text-xs font-normal' />
          </div>

          {description && (<FormDescription className='text-xs'>{description}</FormDescription>)}

          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={id}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className='flex flex-row items-start space-x-3 space-y-0 mt-1.5'
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                              field.value?.filter(
                                (value) => {
                                  return value !== item.id
                                }
                              )
                            )
                        }}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}

          <FormMessage />
        </FormItem>
      )}
    />
  )
}