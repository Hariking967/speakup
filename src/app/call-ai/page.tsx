import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CallAIView from '@/modules/agents/ui/views/callai';
import { CallAIViewLoading, CallAIViewError } from '@/modules/agents/ui/views/callai';
import CallAIHeader from '@/modules/agents/ui/views/call-ai-header';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/agents/params';
interface Props{
  searchParams: Promise<SearchParams>
}

export default async function CallAIPage({searchParams}:Props) {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
      headers: await headers()
    })
    if (!session)
    {
      redirect("auth/sign-in")
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));
  return (
    <div>
      <CallAIHeader />
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
