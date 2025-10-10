import { SearchIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-provider'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { type DashboardRootState } from '@/stores/dashboard-store'
import { useUpdateEffect } from '@/hooks/use-update-effect'
import { useCallback } from 'react'

type SearchProps = {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  onSearch?: (search: string) => void
}

export function Search({
  className = '',
  placeholder = 'Search',
  onSearch,
}: SearchProps) {
  const { setSearch, setOpen, state } = useSearch()

  const search = useSelector((state: DashboardRootState) => state.dashboard.search)

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSearch('');
  }, [setSearch]);

  useUpdateEffect(() => {
    onSearch?.(state.searchQuery);
  }, [state.searchQuery])

  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        'bg-muted/25 group text-muted-foreground hover:bg-accent relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:w-40 sm:pe-12 md:flex-none lg:w-52 xl:w-64',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <div className="relative w-full h-full flex items-center">
        <SearchIcon
          aria-hidden="true"
          className="absolute start-1.5 top-1/2 -translate-y-1/2"
          color="#ff821c"
          size={16}
        />
        <span className="ms-4">{search || placeholder}</span>
        {search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-5 w-5 p-0 hover:bg-muted"
            onClick={handleClear}
          >
            <X size={12} />
          </Button>
        )}
      </div>
    </Button>
  )
}
