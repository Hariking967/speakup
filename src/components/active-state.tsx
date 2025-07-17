import { EmptyState } from "./empty-state"
import { Button } from "./ui/button"
import Link from "next/link"
import { VideoIcon } from "lucide-react"

interface Props{
  meetingId: string;
}

export const ActiveState = ({meetingId}:Props) => {
  return(
    <div className="bg-zinc-600 rounded-lg x-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image="/upcoming.svg" title="Meeting is active" description="Meeting will end once all participants left." />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-4 lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}