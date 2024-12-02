"use client"

import React from 'react'
import { UserNav } from './user-nav'
import { ThemeToggle } from '../theme/theme-toggle'

export const HeaderDashboard = () => {

  return (
   
        <div className="flex items-center gap-2 mr-4">
          <UserNav />
          <ThemeToggle />
        </div>
    
  )
}