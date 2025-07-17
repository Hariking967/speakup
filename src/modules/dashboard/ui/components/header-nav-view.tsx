'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

export default function HeaderNavView() {
  const pathname = usePathname();
  const part = pathname.replace(/^\/+/, "").split("/")[0] || "Home";
  let currentPathname = part.charAt(0).toUpperCase() + part.slice(1);
  if (currentPathname.includes('-'))
  {
    const idx = currentPathname.indexOf('-');
    currentPathname = currentPathname.slice(0,idx) + ' ' + currentPathname.charAt(idx+1).toUpperCase() + currentPathname.slice(idx+2);
  }
  const router = useRouter();
  const {data: session} = authClient.useSession();
  return (
    <div className='flex flex-row justify-between bg-zinc-700 px-4 py-2'>
      <div className='flex flex-row justify-between items-center gap-2'>
        <SidebarTrigger className='border-2 bg-zinc-300 hover:bg-gray-400'></SidebarTrigger>
        <span className=' text-white text-4xl'>{currentPathname}</span>
      </div>
      <div className='flex flex-row justify-between items-center gap-2'>
        <span className=' text-white text-3xl'>{session?.user.name}</span>
        <Button className='bg-red-700' onClick={()=>{authClient.signOut({fetchOptions: {onSuccess:()=> router.push('/auth/sign-in')}})}}>Logout</Button>
      </div>
    </div>
  )
}
