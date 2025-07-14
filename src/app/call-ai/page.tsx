import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CallAIView from '@/modules/agents/ui/views/callai';
import { CallAIViewLoading, CallAIViewError } from '@/modules/agents/ui/views/callai';


export default function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CallAIViewLoading />}>
          <ErrorBoundary fallback={<CallAIViewError />}>
            <CallAIView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}
