"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError: ()=>{
        window.alert("Something went wrong!");
      },
      onSuccess: ()=>{
        window.alert("success");
      }
    });
  }
  if (session)
    {
      return(
      <div className='flex flex-col p-4 gap-y-4'>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=>authClient.signOut()}>
          Sign out
        </Button>
      </div>
      );
    } 
  return (
    <div>
      <Input placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <Input placeholder='email'  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <Input placeholder='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
