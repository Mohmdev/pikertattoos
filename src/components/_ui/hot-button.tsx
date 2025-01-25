import React from 'react'

import { cn } from '@utils/cn'

interface HotButtonProps {
  children: React.ReactNode

  className?: string
}

export const HotButton = ({ children, className }: HotButtonProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="group relative">
        <button className="relative inline-block cursor-pointer rounded-xl bg-gray-800 p-px font-semibold leading-6 text-white shadow-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
          <span className="bg-gradient-to-r absolute inset-0 rounded-xl from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="relative z-10 block rounded-xl bg-gray-950 px-6 py-3">
            <div className="relative z-10 flex items-center space-x-2">
              <span className="transition-all duration-500 group-hover:translate-x-1">
                {children}
              </span>
            </div>
          </span>
        </button>
      </div>
    </div>
  )
}

HotButton.displayName = 'HotButton'
