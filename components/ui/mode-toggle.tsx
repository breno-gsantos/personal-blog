'use client'

import { useTheme } from "next-themes"
import { Button } from "./button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('light')
  }

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme} aria-label="Toggle theme">
      <SunIcon className="size-10 rotate-0 scale-100 transition-all dark:scale-0" />
      <MoonIcon className="absolute size-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )

}