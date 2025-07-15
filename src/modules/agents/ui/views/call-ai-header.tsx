"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialogue from './new-agent-dialogue'

export default function CallAIHeader() {
  const [isDopen, setIsDopen] = useState(false);

  return (
    <>
      <NewAgentDialogue open={isDopen} onOpenChange={setIsDopen}/>
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='text-white text-2xl'>My Agents</h5>
          <Button onClick={()=>{setIsDopen(true);}}><PlusIcon/> New Agent</Button>
        </div>
      </div>
    </>
  )
}
