import { EmptyState } from "./empty-state"

export const ProcessingState = () => {
  return(
    <div className="bg-zinc-600 rounded-lg x-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState image="/processing.svg" title="Meeting completed" description="This meeting was completed, a summary will appear soon" />
    </div>
  )
}