"use client"

import { Button } from '@/components/ui/button';
import { PlusIcon, XCircleIcon } from 'lucide-react';
import NewMeetingDialogue from './new-meeting-dialog';
import { useState } from 'react';
import MeetingsSearchFilter from './meetings-search-filter';
import { StatusFilter } from './status-filter';
import useMeetingsFilters from '../../hooks/use-meetings-filters';

export default function MeetingsHeader() {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDopen, setIsDopen] = useState(false);

  const isAnyFilterModified = !!filters.status || !!filters.search;
  const onClearFilters = () => {
    setFilters({
      status: null,
      search: "",
      page: 1
    })
  }
  return (
    <>
      <NewMeetingDialogue open={isDopen} onOpenChange={setIsDopen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='text-white text-2xl'>My Meetings</h5>
          <Button onClick={()=>{setIsDopen(true);}}><PlusIcon/> New Meeting</Button>
        </div>
        <div className='flex items-center gap-x-2 p-1'>
          <MeetingsSearchFilter />
          <StatusFilter />
          {isAnyFilterModified && (
            <Button variant='outline' onClick={onClearFilters}>
              <XCircleIcon className='size-4' />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  )
}