'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import canUseDOM from '@utils/canUseDOM'

import type { Theme, ThemeContextType } from './types'

import { getImplicitPreference } from './shared'
import { themeIsValid } from './types'
import { defaultTheme, themeLocalStorageKey } from '@constants/theme'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({
  children,
  defaultTheme: defaultThemeProp = defaultTheme
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultThemeProp)

  const setTheme = useCallback(
    (themeToSet: Theme | null) => {
      if (!canUseDOM) return

      if (themeToSet === null) {
        window.localStorage.removeItem(themeLocalStorageKey)
        const implicitPreference = getImplicitPreference()
        document.documentElement.setAttribute('data-theme', implicitPreference || defaultThemeProp)
        if (implicitPreference) setThemeState(implicitPreference)
        else setThemeState(defaultThemeProp)
      } else {
        setThemeState(themeToSet)
        window.localStorage.setItem(themeLocalStorageKey, themeToSet)
        document.documentElement.setAttribute('data-theme', themeToSet)
      }
    },
    [defaultThemeProp]
  )

  useEffect(() => {
    if (!canUseDOM) return

    const storedTheme = window.localStorage.getItem(themeLocalStorageKey)

    const themeToSet = themeIsValid(storedTheme)
      ? storedTheme
      : defaultThemeProp || getImplicitPreference()

    document.documentElement.setAttribute('data-theme', themeToSet)
    setThemeState(themeToSet)
  }, [defaultThemeProp])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
