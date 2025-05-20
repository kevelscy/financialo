import { Button, buttonVariants } from '@/ui/button'
import type { ReactNode } from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string
  children?: ReactNode
  create?: {
    url?: string
    label: string
    onClick?: () => void
  }
}

export const HeaderPage = ({ title, description, create, children }: Props) => {
  if (children) {
    return (
      <header className='w-full flex flex-col lg:flex-row justify-between items-start lg:items-center'>
        {children}
      </header>
    )
  }

  return (
    <header className='w-full flex flex-col lg:flex-row justify-between items-start lg:items-center'>
      <div>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </div>

      <div className='mt-4 lg:mt-0 text-left lg:text-end'>
        {
          create?.url && (
            <Link
              href={create?.url}
              className={buttonVariants({ variant: 'default' })}
            >
              <Plus size={18} />
              {create?.label}
            </Link>
          )
        }

        {
          create?.onClick && (
            <Button
              onClick={create?.onClick}
            >
              <Plus size={18} />
              <span className='text-sm'>{create?.label}</span>
            </Button>
          )
        }
      </div>
    </header>
  )
}