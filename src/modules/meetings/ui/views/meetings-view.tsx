"use client"

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { EmptyState } from "@/components/empty-state";

export default function MeetingsView() {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div>
      <DataTable columns={columns} data={data.items} />
      {data.items.length == 0 && (
        <EmptyState title='Create your first meeting' description='Schedule a meeting to connect with others.'/>
      )}
    </div>
  )
}

export function MeetingsViewLoading()
{
  return(
    <LoadingState title='Loading Meetings' description='This may take a few seconds...' />
  );
}

export function MeetingsViewError()
{
  return(
    <ErrorState title='Error Loading Meetings' description='Something went wrong :(' />
  );
}