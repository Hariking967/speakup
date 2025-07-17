"use client"

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import NewMeetingDialogue from './new-meeting-dialog';
import { useState } from 'react';

export default function MeetingsHeader() {
  const [isDopen, setIsDopen] = useState(false);
  return (
    <>
      <NewMeetingDialogue open={isDopen} onOpenChange={setIsDopen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='text-white text-2xl'>My Meetings</h5>
          <Button onClick={()=>{setIsDopen(true);}}><PlusIcon/> New Meeting</Button>
        </div>
        <div className='flex items-center gap-x-2 p-1'>
          TODO: filters
        </div>
      </div>
    </>
  )
}