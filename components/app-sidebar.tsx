'use client'

import * as React from "react"
import {
 
  Command,
  LayoutDashboard,
  Link,
  User,
  Users,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useSessionStatus } from "@/hooks/useSessionStatut"
import { NavMain } from "./nav-main"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStatus()

  const user = session?.user

  const data = {
    user: user,

    navMain: [
      {
        
          title: "Ma page in bio",
          url: "/dashboard/link",
          icon: Link,
        
        items: [
          {
            title: "Profil info",
            url: "/dashboard/link",
          },
          {
            title: "Mes blocs",
            url: "/dashboard/link/bloc",
          },
          {
            title: "Desing",
            url: "/dashboard/link/desing",
          },
        ],
      },
     
      // {
      //   title: "Documentation",
      //   url: "#",
      //   icon: BookOpen,
      //   items: [
      //     {
      //       title: "Introduction",
      //       url: "#",
      //     },
      //     {
      //       title: "Get Started",
      //       url: "#",
      //     },
      //     {
      //       title: "Tutorials",
      //       url: "#",
      //     },
      //     {
      //       title: "Changelog",
      //       url: "#",
      //     },
      //   ],
      // },
      // {
      //   title: "Settings",
      //   url: "#",
      //   icon: Settings2,
      //   items: [
      //     {
      //       title: "General",
      //       url: "#",
      //     },
      //     {
      //       title: "Team",
      //       url: "#",
      //     },
      //     {
      //       title: "Billing",
      //       url: "#",
      //     },
      //     {
      //       title: "Limits",
      //       url: "#",
      //     },
      //   ],
      // },
    ],
    menu: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    
      {
        name: "Mes contacts",
        url: "/dashboard/contact",
        icon: User,
      },
      {
        name: "Clients",
        url: "/dashboard/client",
        icon: Users,
      },

    ],
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.menu} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {
          data.user &&
          <NavUser user={data.user} />
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
