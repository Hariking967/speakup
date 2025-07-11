"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function HomeView() {
  const router = useRouter();
  const {data: session} = authClient.useSession();
  if (!session)
  {
    return(
      <p>Loading./\.</p>
    );
  }
  return(
    <div className='flex flex-col p-4 gap-y-4'>
      <p>Logged in as {session.user.name}</p>
      <Button onClick={()=>authClient.signOut({fetchOptions: {onSuccess: ()=>{router.push('/auth/sign-in')}}})}>
        Sign out
      </Button>
    </div>
    );
}
