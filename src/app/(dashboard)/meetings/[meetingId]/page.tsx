import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { MeetingIdView, MeetingIdViewError, MeetingIdViewLoading } from '@/modules/meetings/ui/views/meeting-id-view';

interface Props{
  params: Promise<{
    meetingId: string
  }>
}

export default async function page({params}:Props) {
  const { meetingId } = await params;
  const session = await auth.api.getSession({
      headers: await headers()
    })
  if (!session)
  {
    redirect("auth/sign-in")
  }

  const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
      trpc.meetings.getOne.queryOptions({id: meetingId})
    )
    //todo prefetch transcript
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdViewLoading/>}>
        <ErrorBoundary fallback={<MeetingIdViewError/>}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}
