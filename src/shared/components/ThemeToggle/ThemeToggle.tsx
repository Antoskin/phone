"use client";

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Globe, Moon, Sun } from 'lucide-react'
import { DropdownMenu, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from '@/shared/components/ui/dropdown-menu';


const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

 
  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className='hover:opacity-50 transition-opacity'>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme 123</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Globe />
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle