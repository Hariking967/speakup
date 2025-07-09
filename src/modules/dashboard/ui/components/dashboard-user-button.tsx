import { authClient } from '@/lib/auth-client'
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { GenreatedAvatar } from '@/components/generated-avatar';
import { ChevronDownIcon, CreditCardIcon, LogOut, LogOutIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardUserButton() {
  const {data, isPending} = authClient.useSession();
  const router = useRouter();
  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth/sign-in');
        }
      }
    });
  }
  if (isPending || !data?.user)
  {
    return null;
  }
    return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/25 overflow-hidden">
        {data.user.image? 
        (
          <Avatar>
            <AvatarImage className='w-12 h-12 rounded-full mr-2' src={data.user.image}></AvatarImage>
          </Avatar>
        ): (
          <GenreatedAvatar seed={data.user.name} variant="initials" className='size-9 mr-3'></GenreatedAvatar>
        )}
        <div className='flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0'>
          <p className='text-sm truncate w-full'>
            {data.user.name}
          </p>
          <p className='text-xs truncate w-full'>
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className='size-4 shrink-0'></ChevronDownIcon>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='right' className='w-72'>
        <DropdownMenuLabel>
          <div className='flex flex-col gap-1'>
            <span className="font-medium truncate">{data.user.name}</span>
            <span className='text-sm font-normal text-muted-foreground truncate'>{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer flex items-center justify-between'>
          Billing <CreditCardIcon className='size-4' />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout} className='cursor-pointer flex items-center justify-between'>
          Logout <LogOutIcon className='size-4' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
