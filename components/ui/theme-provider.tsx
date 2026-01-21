"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="app-theme"
      {...props}
    >
      <style>{`
        * {
          transition: background-color 0.1s ease, color 0.2s ease, border-color 0.1s ease !important;
        }
        html, body {
          transition: background-color 0.2s ease, color 0.2s ease !important;
        }
      `}</style>
      {children}
    </NextThemesProvider>
  )
}