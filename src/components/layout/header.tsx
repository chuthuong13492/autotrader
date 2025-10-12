import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { MobileNavigation } from './mobile-navigation'
import { Link } from '@tanstack/react-router'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true })

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        offset > 10 && fixed ? 'shadow' : 'shadow-none',
        className
      )}
      style={{
        borderTop:
          'var(--base-space-px-4, 4px) solid #ff821c',
        borderBottom:
          'var(--base-space-px-1, 1px) solid #e1e4e8',
      }}
      {...props}
    >
      <div
        className={cn(
          'relative flex h-full items-center gap-3 px-4 sm:gap-4 @7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
          offset > 10 &&
          fixed &&
          'after:bg-background/20 after:absolute after:inset-0 after:-z-10 after:backdrop-blur-lg'
        )}
      >
        <Prefix />
        {children}
      </div>
    </header>
  )
}


function Prefix() {
  return (
    <>
      {/* HAMBURGER MENU*/}
      <MobileNavigation />
      {/* LOGO */}
      <Link className="header-brand" to="/" aria-label="Find Cars for Sale at Autotrader">
        <img
          src="https://www.autotrader.com/cm-api/content/static/img/icon/logos/atc-logo-blue.svg"
          width="139"
          height="38"
          alt="Autotrader Logo"
        />
      </Link>
    </>
  )
}