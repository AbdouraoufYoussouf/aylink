import { Navbar } from '@/components/landingpage/navbar';
import React from 'react'

export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
       
        <main className="w-full  overflow-hidden">
          <Navbar/>
            {children}
        
        </main>
      </div>
    );
  }