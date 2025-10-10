import { Link } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type NavItem = {
  title: string
  href: string
  isActive?: boolean
  hasDropdown?: boolean
  dropdownItems?: {
    title: string
    href: string
  }[]
}

const navigationItems: NavItem[] = [
  {
    title: 'Used Cars',
    href: '/used-cars',
  },
  {
    title: 'New Cars',
    href: '/new-cars',
  },
  {
    title: 'Private Seller Cars',
    href: '/private-seller-cars',
  },
  {
    title: 'Sell My Car',
    href: '/sell-my-car',
  },
  {
    title: 'Instant Cash Offer',
    href: '/instant-cash-offer',
  },
  {
    title: 'Car Research & Tools',
    href: '/car-research',
    hasDropdown: true,
    dropdownItems: [
      { title: 'Car Reviews', href: '/car-reviews' },
      { title: 'Car Comparisons', href: '/car-comparisons' },
      { title: 'Car Values', href: '/car-values' },
      { title: 'Car Insurance', href: '/car-insurance' },
      { title: 'Car Loans', href: '/car-loans' },
    ],
  },
  {
    title: 'Find Local Dealers',
    href: '/find-dealers',
  },
]

type MainNavigationProps  = React.HTMLAttributes<HTMLElement> &  {
    className?: string,
}


export function MainNavigation({ className }: MainNavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {navigationItems.map((item) => (
        <div key={item.title} className="flex items-center">
          {item.hasDropdown && item.dropdownItems ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:underline',
                    item.isActive && 'text-foreground underline'
                  )}
                >
                  <span>{item.title}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {item.dropdownItems.map((dropdownItem) => (
                  <DropdownMenuItem key={dropdownItem.title} asChild>
                    <Link to={dropdownItem.href}>
                      {dropdownItem.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to={item.href}
              className={cn(
                'text-sm font-medium text-muted-foreground hover:underline',
                item.isActive && 'text-gray-900 underline'
              )}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
