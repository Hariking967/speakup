import { EmptyState } from "./empty-state"
import { Button } from "./ui/button"
import Link from "next/link"
import { VideoIcon, BanIcon } from "lucide-react"

interface Props{
  meetingId: string;
  onCancelMeeting: ()=>void;
  isCancelling: boolean;
}

export const UpcomingState = ({meetingId, onCancelMeeting, isCancelling}:Props) => {
  return(
    <div className="bg-zinc-600 rounded-lg x-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image="/upcoming.svg" title="Not started yet" description="Once you start this meeting, a summary will appear here" />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button disabled={isCancelling} onClick={onCancelMeeting} variant='secondary' className="w-4 lg:w-auto">
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button disabled={isCancelling} asChild className="w-4 lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}