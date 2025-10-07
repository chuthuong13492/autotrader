import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

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
    title: 'Home',
    href: '/',
  },
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

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="@[1300px]:hidden"
        >
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetTitle ></SheetTitle>
        <nav className="mt-16 px-4 space-y-4">
          {navigationItems.map((item, index) => (
            <div key={item.title}>
              {index > 0 && <Separator className="my-4" orientation='horizontal' />}
              {item.hasDropdown && item.dropdownItems ? (
                <Collapsible className="space-y-2">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                    <span className="text-sm font-medium">{item.title}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 space-y-2">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.title}
                        to={dropdownItem.href}
                        className="block text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropdownItem.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'block text-md text-gray-900 cursor-pointer',
                    item.isActive && 'text-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
