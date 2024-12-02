import { NavItem } from "../types/nav-item-type";

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Agents',
    href: '/dashboard/agent',
    icon: 'agent',
    label: 'agent'
  },
  {
    title: 'Planning',
    href: '/dashboard/planning',
    icon: 'calendar',
    label: 'planning'
  },
  {
    title: 'Contacts',
    icon: 'contact',
    label: 'contact',
    children: [
      {
        title: 'Tous les contacts',
        href: '/dashboard/contact',
        icon: 'contact',
      },
      {
        title: 'Lead RDV',
        href: '/dashboard/contact/rdv',
        icon: 'contact',
      },
      {
        title: 'Callback RDV',
        href: '/dashboard/contact/callback',
        icon: 'contact',
      },
      {
        title: 'Tous les clients',
        href: '/dashboard/contact/client',
        icon: 'contact',
      },
    ]
  },

  {
    title: 'Devis',
    href: '/dashboard/devis/lead-france',
    icon: 'devis',
    label: 'devis',
    children: [
      {
        title: 'Lead France',
        href: '/dashboard/devis/lead-france',
      },
      {
        title: 'Callback France',
        href: '/dashboard/devis/callback-france',
      },
      {
        title: 'Lead Maroc',
        href: '/dashboard/devis/lead-maroc',
      },
      {
        title: 'Callback Maroc',
        href: '/dashboard/devis/callback-maroc',
      },
      {
        title: 'Client Devis',
        href: '/dashboard/devis/client',
      },
    ]
  },
 
  {
    title: 'Settings',
    href: '/dashboard/setting',
    icon: 'settings',
    label: 'settings'
  },
]

