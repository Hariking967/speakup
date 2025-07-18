interface Props{
  params: Promise<{meetingId: string}>
}

import { auth } from '@/lib/auth'
import { CallView } from '@/modules/call/ui/views/call-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function CallPage({params}:Props) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session)
  {
    redirect("auth/sign-in")
  }
  const {meetingId} = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId}),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallView meetingId={meetingId} />
    </HydrationBoundary>
  )
}
