'use client'

import { ChevronsUpDown, LogOut, Settings, User, Users2 } from 'lucide-react'

import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { BadgeEmailVerified } from '../user-bage-email-verified'
import { DialogTrigger } from '../ui/dialog copy'
import { buttonVariants } from '../ui/button'

export const Topbar = () => {
  const { user, isLoaded } = useUser()

  return (
    <header className='flex justify-end items-center p-4 gap-4 h-16'>
      <div className='flex flex-row-reverse justify-end gap-4 items-center'>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground text-sidebar-text cursor-pointer flex gap-2 items-center'
            >
              <Avatar className='h-8 w-8 rounded-full'>
                <AvatarImage src={user?.imageUrl} alt={user?.firstName} className='object-cover' />

                <AvatarFallback className='rounded-full bg-white text-zinc-800'>
                  <User size={24} strokeWidth={2} />
                </AvatarFallback>
              </Avatar>

              <div className='w-full max-w-40 hidden sm:flex flex-col'>
                <div className='flex text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user?.firstName} {user?.lastName}</span>
                </div>

                <div className='flex items-center text-left text-xs leading-tight'>
                  <BadgeEmailVerified isVerified={user?.hasVerifiedEmailAddress} />
                  <span className='truncate'>{user?.emailAddresses[0].emailAddress}</span>
                </div>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className=' min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={8}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-full'>
                  <AvatarImage src={user?.imageUrl} alt={user?.firstName} className='object-cover' />

                  <AvatarFallback className='rounded-full bg-zinc-100 dark:bg-white text-black'>
                    <User size={24} strokeWidth={2.5} />
                  </AvatarFallback>
                </Avatar>

                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <div className='flex text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>{user?.firstName} {user?.lastName}</span>
                  </div>

                  <div className='flex items-center text-left text-xs leading-tight'>
                    <BadgeEmailVerified isVerified={user?.hasVerifiedEmailAddress} />

                    <span className='truncate'>{user?.emailAddresses[0].emailAddress}</span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users2 size={16} />
                Mi Perfil
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings size={16} />
                Configuración
              </DropdownMenuItem>

              <DropdownMenuItem>
                <LogOut size={16} />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <SignedOut>
          <SignInButton mode='modal'>
            <div className={buttonVariants({ variant: 'default' })}>
              Iniciar sesión
            </div>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}