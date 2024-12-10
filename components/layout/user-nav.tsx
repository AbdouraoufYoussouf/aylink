'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useSessionStatus } from '@/hooks/useSessionStatut';
import { Loader2, LogOut, Settings, User } from 'lucide-react';
import { signOut, } from 'next-auth/react'; // getSession pour forcer la récupération de la session
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';

export function UserNav() {
  const router = useRouter();
  const { session, loading } = useSessionStatus();

  // Si on est en train de forcer la récupération de la session, on affiche un message de chargement
  if (loading) {
    return <div><Loader2 className='animate-spin' /></div>;
  }
  // console.log('session:',session?.user)
  // Si une session existe, on affiche le menu utilisateur
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user?.image ?? ''}
                alt={session.user?.name ?? ''}
              />
              <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="end" forceMount>
          <DropdownMenuLabel className="font-normal flex items-center gap-1">
            <Avatar className="cursor-pointer h-8 w-8">
              <AvatarImage src={session.user?.image || ''} />
              <AvatarFallback className='bg-sky-500'>
                <FaUser size={16} color='white' />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {
              session?.user?.id && 
            <DropdownMenuItem className='cursor-pointer' asChild>
              <Link href={`/dashboard/agent/profil/${session.user.id}`} className="w-full flex items-center justify-between">
                Profile
                <User className="ml-2 h-4 w-4" />
              </Link>
            </DropdownMenuItem>
            }

            <DropdownMenuItem  className='cursor-pointer' onClick={() => router.push('/dashboard/setting')}>
              Settings
              <DropdownMenuShortcut>
                <Settings className="ml-2 h-4 w-4"/>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'  onClick={() => signOut({ callbackUrl: "/" })}>
            Déconnexion
            <DropdownMenuShortcut className='text-red-400' >
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Si la session est nulle et que isAuth est faux, rien n'est affiché
  return null;
}
