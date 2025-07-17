"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import MeetingIdViewHeader from "./meeting-id-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "../../hooks/use-confirm";
import UpdateMeetingDialogue from "./update-meeting-dialog copy";
import { useState } from "react";

interface Props{
  meetingId: string;
}

export const MeetingIdView = ({meetingId}:Props) => {
  const trpc = useTRPC();
  const [updateMeetingDopen, setUpdateMeetingDopen] = useState(false);
  const queryClient = useQueryClient();
  const {data} = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId})
  )
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  )
  const router = useRouter();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        //invalidate free tier
        router.push('/meetings')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  )
  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({id: meetingId})
  }
  return(
    <>
    <RemoveConfirmation />
    <UpdateMeetingDialogue open={updateMeetingDopen} onOpenChange={setUpdateMeetingDopen} initialValues={data} />
      <div className="flex-1 py-4 px-4 md:px--8 flex flex-col gap-y-4">
        <MeetingIdViewHeader meetingId={meetingId} meetingName={data.name} onEdit={()=>setUpdateMeetingDopen(true)} onRemove={handleRemoveMeeting} />
        {JSON.stringify(data,null, 2)}
      </div>
    </>
  )
}

export function MeetingIdViewLoading()
{
  return(
    <LoadingState title='Loading Meetings' description='This may take a few seconds...' />
  );
}

export function MeetingIdViewError()
{
  return(
    <ErrorState title='Error Loading Meetings' description='Something went wrong :(' />
  );
}