import React, { Suspense } from 'react'
import MeetingsView, { MeetingsViewError, MeetingsViewLoading } from '@/modules/meetings/ui/views/meetings-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import MeetingsHeader from '@/modules/meetings/ui/views/meetings-list-header';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { loadSearchParams } from '@/modules/meetings/params';
import type { SearchParams } from 'nuqs/server';

interface Props{
  searchParams: Promise<SearchParams>;
}

export default async function page({ searchParams }:Props) {
  const filters = await loadSearchParams(searchParams);
  const session = await auth.api.getSession({
        headers: await headers()
      })
      if (!session)
      {
        redirect("auth/sign-in")
      }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({...filters})
  )
  return (
    <>
      <MeetingsHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}
