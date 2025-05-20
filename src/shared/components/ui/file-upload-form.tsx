import { UseFormReturn } from 'react-hook-form'
import { CloudUpload, X } from 'lucide-react'

import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger } from '@/ui/file-upload'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Button } from '@/ui/button'

interface FileUploadFormProps {
  id: string
  form: UseFormReturn<any>
  label?: string
  ctaText?: string
  maxFiles?: number
  description?: string
}

export function FileUploadForm({ id, form, label, ctaText, description, maxFiles = 1 }: FileUploadFormProps) {
  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <FileUpload
              value={field.value}
              onValueChange={field.onChange}
              accept='image/*'
              maxFiles={maxFiles}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => form.setError(id, { message })}
              multiple
            >
              <FileUploadDropzone className='flex-col border-dotted gap-1'>
                <CloudUpload size={60} strokeWidth={1.2} className='text-zinc-600' />

                <span className='max-w-52 text-center text-xs text-zinc-500'>
                  {ctaText || 'Arrastra y suelta imágenes aquí o haz clic para cargarlas'}
                </span>

                <FileUploadTrigger asChild>
                  <Button variant='link' size='sm' className='p-0'>
                    Elige archivos
                  </Button>
                </FileUploadTrigger>
              </FileUploadDropzone>

              <FileUploadList>
                {field?.value?.map?.((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='size-7'
                      >
                        <X />
                        <span className='sr-only'>Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}

          <FormMessage className='text-xs font-normal' />
        </FormItem>
      )}
    />
  )
}