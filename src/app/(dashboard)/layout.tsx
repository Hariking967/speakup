import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'
import DashboardSidebar from '@/modules/dashboard/ui/components/dashboard-sidebar';
import HeaderNavView from '@/modules/dashboard/ui/components/header-nav-view';
interface Props {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
  return (
    <SidebarProvider>
        <DashboardSidebar></DashboardSidebar>
        <main className='flex flex-col h-screen w-screen bg-muted'>
          
            <HeaderNavView path="Home"></HeaderNavView>
            {children}
        </main>
    </SidebarProvider>
  )
}
