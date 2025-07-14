"use client"

import React from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { LoadingState } from '@/components/loading-state'
import { ErrorState } from '@/components/error-state'

export default function CallAIView() {
    const trpc = useTRPC();
    const { data, isLoading, isError } = useSuspenseQuery(trpc.agents.getMany.queryOptions())
  return (
    <div>
      {JSON.stringify(data, null, 2)}
    </div>
  )
}

export function CallAIViewLoading()
{
  return(
    <LoadingState title='Loading Agents' description='This may take a few seconds...' />
  );
}

export function CallAIViewError()
{
  return(
    <ErrorState title='Error Loading Agents' description='Something went wrong :(' />
  );
}