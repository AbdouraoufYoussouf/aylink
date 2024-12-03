import { SidebarDashboard } from '@/components/layout/sidebar-dashboard';
import React from 'react'

export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
       
        <main className="w-full  overflow-hidden">
          <SidebarDashboard>
            {children}
          </SidebarDashboard>
        
        </main>
      </div>
    );
  }