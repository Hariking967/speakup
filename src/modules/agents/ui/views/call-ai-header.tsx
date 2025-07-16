"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewAgentDialogue from './new-agent-dialogue'
import useAgentsFilters from '../../hooks/use-agents-filters'
import AgentsSearchFilter from './agents-search-filter'
import { DEFAULT_PAGE } from '@/constants'

export default function CallAIHeader() {
  const [filters, setFilters] = useAgentsFilters();
  const [isDopen, setIsDopen] = useState(false);
  const isAnyFilterModified = !!filters.search;

  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE
    })
  }
  return (
    <>
      <NewAgentDialogue open={isDopen} onOpenChange={setIsDopen}/>
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
        <div className='flex items-center justify-between'>
          <h5 className='text-white text-2xl'>My Agents</h5>
          <Button onClick={()=>{setIsDopen(true);}}><PlusIcon/> New Agent</Button>
        </div>
        <div className='flex items-center gap-x-2 p-1'>
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button variant='outline' size='sm' onClick={onClearFilters}>
              <XCircleIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
