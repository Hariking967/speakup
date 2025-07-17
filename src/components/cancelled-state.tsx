import { EmptyState } from "./empty-state"

export const CancelledState = () => {
  return(
    <div className="bg-zinc-600 rounded-lg x-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image="/cancelled.svg" title="Meeting is cancelled" description="This meeting was cancelled" />
    </div>
  )
}