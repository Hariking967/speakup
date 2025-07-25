import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronRightIcon, TrashIcon, PencilIcon, MoreVertical, MoreVerticalIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from '@/components/ui/dropdown-menu';

interface Props{
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}

import React from 'react'

export default function MeetingIdViewHeader({ meetingId,meetingName,onEdit,onRemove }:Props) {
  return (
    <div className='flex items-center justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl'>
              <Link href="/meetings" className='text-white hover:text-zinc-300'>
                My Meetings
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='text-white text-xl font-medium [&>svg]:size-4'>
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className='font-medium text-xl text-white'>
              <Link href={`/meetings/${meetingId}`} className='text-white hover:text-zinc-300'>
                {meetingName}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className='bg-white'>
            <MoreVerticalIcon className='bg-white'/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={onEdit}>
            <PencilIcon className='size-4 text-black'/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onRemove}>
            <TrashIcon className='size-4 text-black'/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
