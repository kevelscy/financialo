import { BadgeCheck, BadgeX } from 'lucide-react'

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/ui/tooltip'

export const BadgeEmailVerified = ({ isVerified }) => {
  if (isVerified) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <BadgeCheck size={14} className='mr-0.5 mt-0.5 text-blue-700' />
          </TooltipTrigger>

          <TooltipContent className='flex items-center justify-start'>
            <BadgeCheck size={14} className='mr-0.5 mt-0.5 text-blue-700' />
            Correo verificado
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <BadgeX size={14} className='mr-0.5 mt-0.5 text-red-700' />
        </TooltipTrigger>

        <TooltipContent className='flex items-center justify-start'>
          <BadgeX size={14} className='mr-0.5 mt-0.5 text-red-700' />
          Correo no verificado
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>)

}