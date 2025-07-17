"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetMany } from "../../types"
import { GenreatedAvatar } from "@/components/generated-avatar"
import { CornerDownRight, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name", 
    cell: ({row})=>(
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center">
          <GenreatedAvatar seed={row.original.name} variant="botttsNeutral" className="size-6 mr-2"/>
          <span className="font-semibold capitalize text-white">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRight className="size-3 text-muted-foreground" />
            <span className="text-sm text-white max-w-[200px] truncate capitalize">
              {row.original.instructions}
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    accessorKey: "meetingsCount",
    header: "Meetings",
    cell: ({row}) => (
      <Badge className="flex items-center gap-x-2 [&>svg]:size-6">
        <VideoIcon className="text-white" />
        5 meetings
        {/* {row.original.meetingsCount} {row.original.meetingCount == 1 ? "meeting" : "meetings"} */}
      </Badge>
    )
  }
]