import React from 'react'
import { AgentGetOne } from '../../types';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { agentsInsertSchema } from '../../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { GenreatedAvatar } from '@/components/generated-avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AgentFormProps{
  onSuccess?: ()=>void;
  onCancel?: ()=>void;
  initialValues?: AgentGetOne;
}

export default function AgentForm({onSuccess, onCancel, initialValues}:AgentFormProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(trpc.agents.create.mutationOptions({
    onSuccess: async ()=>{
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({}),
      )
      if (initialValues?.id){
        await queryClient.invalidateQueries(
          trpc.agents.getOne.queryOptions({id: initialValues.id})
        )
      }
      onSuccess?.()
    },
    onError: (error)=>{
      toast.error(error.message);
      //premium
    }
  }))
    const updateAgent = useMutation(trpc.agents.update.mutationOptions({
    onSuccess: async ()=>{
      await queryClient.invalidateQueries(
        trpc.agents.getMany.queryOptions({}),
      )
      if (initialValues?.id){
        await queryClient.invalidateQueries(
          trpc.agents.getOne.queryOptions({id: initialValues.id})
        )
      }
      onSuccess?.()
    },
    onError: (error)=>{
      toast.error(error.message);
      //premium
    }
  }))

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? ""
    }
  })
  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>)=>{
    if (isEdit){
      updateAgent.mutate({...values, id: initialValues.id})
    } else {
      createAgent.mutate(values);
    }
  }
  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <GenreatedAvatar seed={form.watch("name")} variant='botttsNeutral' className='border size-16'/>
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Tutor' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='You are an helpful assignment that boosts confidence of the user.' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {onCancel && (
            <Button variant="ghost" disabled={isPending} type='button' onClick={()=>{onCancel()}}>Cancel</Button>
          )}
          <Button disabled={isPending} type="submit" >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
