"use client";

import DashboardUserButton from "./dashboard-user-button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BotIcon, ContactIcon, History, HistoryIcon, StarIcon, UserIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
const firstSection = [
    {
        icon: VideoIcon,
        label: "Meetings",
        href: "/meetings"
    },
    {
        icon: UserIcon,
        label: "Call Human",
        href: "/call-human"
    },
    {
        icon: BotIcon,
        label: "Call AI",
        href: "/call-ai"
    }
];

const middleSection = [
    {
        icon: HistoryIcon,
        label: "History",
        href: "/history"
    },
    {
        icon: ContactIcon,
        label: "Account",
        href: "/accounts"
    },
]

const secondSection = [
    {
        icon: StarIcon,
        label: "Upgrade",
        href: "/upgrade"
    },
];

import React from 'react'
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();
// const pathname = "/meetings"
  return (
    <Sidebar>
        <SidebarHeader className="text-sidebar-accent-foreground">
            <Link href='/' className="flex items-center gap-2 px-2 pt-2">
                <Image src='/logo.png' height={45} width={45} alt="SpeakUP"></Image>
                <p className="text-2xl font-semibold">SpeakUP</p>
            </Link>
        </SidebarHeader>
        <div className="px-4 py-2">
            <Separator className="opacity-10 text-[#5D6B68]"></Separator>
        </div>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {firstSection.map((item)=>(
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild 
                                isActive = {pathname == item.href}
                                className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}>
                                    <Link href={item.href}>
                                    <item.icon className="size-5"></item.icon>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"></Separator>
            </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {middleSection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild 
                                    isActive = {pathname == item.href}
                                    className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidbar/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}>
                                        <Link href={item.href}>
                                        <item.icon className="size-5"></item.icon>
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            <div className="px-4 py-2">
                <Separator className="opacity-10 text-[#5D6B68]"></Separator>
            </div>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {secondSection.map((item)=>(
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                asChild 
                                isActive = {pathname == item.href}
                                className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidbar/50 to-sidebar/50", pathname === item.href && "bg-linear-to-r/oklch border-[#5D6B68]/10")}>
                                    <Link href={item.href}>
                                    <item.icon className="size-5"></item.icon>
                                        <span className="text-sm font-medium tracking-tight">
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="text-white">
            <DashboardUserButton />
        </SidebarFooter>
    </Sidebar>
  )
}
