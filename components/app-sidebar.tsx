'use client'

import * as React from "react"
import {

  Command,
  LayoutDashboard,
  Link,
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
import { useQuery } from "@tanstack/react-query"
import { listTagsAction } from "@/actions/tag-action"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session } = useSessionStatus()

  const user = session?.user


  const { isLoading, data: tags } = useQuery({
    queryKey: ['tags', user?.pseudo],
    queryFn: async () => {
      const res = await listTagsAction();
      if (res.success === true) {
        return res.data;
      }
      return [];
    },
    enabled: !!session?.user.pseudo,
    staleTime: 5000,
  });


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
      {
        title: "Mes leads",
        url: "/dashboard/contact",
        icon: Users,
        items: [
          {
            title: "Tous les lead",
            url: "/dashboard/contact",
          },
          ...(isLoading
            ? [{ title: "Chargement des tags...", url: "#" }]
            : Array.isArray(tags) && tags.length > 0
              ? tags.map(tag => ({
                title: `Lead ${tag.name.toUpperCase()}`,
                url: `/dashboard/contact/tag/${tag.name}`,
              }))
              : [{ title: "Aucun tag trouvé", url: "#" }] // Fallback en cas d'absence de tags.
          ),

        ],
      },
    ],
    menu: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
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
                  <span className="truncate font-semibold">AYlinker</span>
                  <span className="truncate text-xs">Rafien</span>
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
