import React, { useState } from 'react'
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { meetingsInsertSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { MeetingGetOne } from '../../type';
import CommandSelect from './command-select';
import { GenreatedAvatar } from '@/components/generated-avatar';
import NewAgentDialogue from '@/modules/agents/ui/views/new-agent-dialogue';

interface MeetingFormProps{
  onSuccess?: (id?: string)=>void;
  onCancel?: ()=>void;
  initialValues?: MeetingGetOne;
}

export default function MeetingForm({onSuccess, onCancel, initialValues}:MeetingFormProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const agents = useQuery(trpc.agents.getMany.queryOptions({pageSize: 100, search: agentSearch }));
  const createMeeting = useMutation(trpc.meetings.create.mutationOptions({
    onSuccess: async (data)=>{
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({}),
        //todo invalidate free usage
      )
      if (initialValues?.id){
        await queryClient.invalidateQueries(
          trpc.agents.getOne.queryOptions({id: initialValues.id})
        )
      }
      onSuccess?.(data.id)
    },
    onError: (error)=>{
      toast.error(error.message);
      // forbiden
    }
  }))
    const updateMeeting = useMutation(trpc.meetings.update.mutationOptions({
    onSuccess: async ()=>{
      await queryClient.invalidateQueries(
        trpc.meetings.getMany.queryOptions({}),
      )
      if (initialValues?.id){
        await queryClient.invalidateQueries(
          trpc.meetings.getOne.queryOptions({id: initialValues.id})
        )
      }
      onSuccess?.()
    },
    onError: (error)=>{
      toast.error(error.message);
      //premium
    }
  }))

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? ""
    }
  })
  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>)=>{
    if (isEdit){
      updateMeeting.mutate({...values, id: initialValues.id})
    } else {
      createMeeting.mutate(values);
    }
  }
  return (
    <>
    <NewAgentDialogue open={openNewAgentDialog} onOpenChange={setOpenNewAgentDialog} />
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        name="name"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
          <Input {...field} placeholder="Meet 1" />
          </FormControl>
          <FormMessage />
        </FormItem>
        )}
      />
      <FormField
        name="agentId"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Agent</FormLabel>
          <FormControl>
          <CommandSelect
            options={(agents.data?.items ?? []).map((agent) => ({
            id: agent.id,
            value: agent.id,
            children: (
              <div className="flex items-center gap-x-2">
              <GenreatedAvatar seed={agent.name} variant="botttsNeutral" className="border size-6" />
              <span>{agent.name}</span>
              </div>
            ),
            }))}
            onSelect={field.onChange}
            onSearch={setAgentSearch}
            value={field.value}
            placeholder="Select an Agent"
          />
          </FormControl>
          <FormDescription>
            Not found what you&apos;re looking for{" "}
            <Button type='button' className='text-white hover:underline bg-green-400 hover:bg-green-300' onClick={()=>{setOpenNewAgentDialog(true);}}>Create new Agent</Button> 
          </FormDescription>
          <FormMessage />
        </FormItem>
        )}
      />
      <div>
        {onCancel && (
        <Button variant="ghost" disabled={isPending} type="button" onClick={() => { onCancel(); }}>
          Cancel
        </Button>
        )}
        <Button disabled={isPending} type="submit">
        {isEdit ? "Update" : "Create"}
        </Button>
      </div>
      </form>
    </Form>
    </>
  )
}
