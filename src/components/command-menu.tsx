
import { useState, useMemo, useCallback } from 'react'
import { useRouter } from '@tanstack/react-router'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useDebouncedCallback } from 'use-debounce'
import { brandFilterData, yearFilterData } from '@/features/dashboard/data/filter-data'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ScrollArea } from './ui/scroll-area'
import { type DashboardDispatch, type DashboardRootState } from '@/stores/dashboard-store'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch, filterPage } from '@/stores/dashboard-slice'
import { type FilterTransmissionType } from '@/features/dashboard/components/dashboard-filter'

// Optimized CommandItem component
const CommandItemWithIcon = ({ 
  value, 
  onSelect, 
  children, 
  icon 
}: { 
  value: string
  onSelect: (value: string) => void
  children: React.ReactNode
  icon?: React.ReactNode
}) => (
  <CommandItem
    value={value}
    onSelect={() => onSelect(value)}
  >
    {icon || (
      <div className='flex size-4 items-center justify-center'>
        <ArrowRight className='text-muted-foreground/80 size-2' />
      </div>
    )}
    {children}
  </CommandItem>
)

export function CommandMenu() {
  const router = useRouter()

  const { state, setOpen } = useSearch()


  const values = useSelector((state: DashboardRootState) => state.dashboard.values)

  const dispatch = useDispatch<DashboardDispatch>()

  // Local state for current input value
  const [inputValue, setInputValue] = useState('')

  // Memoized suggestions (static data)
  const suggestions = useMemo(() => ({
    makes: brandFilterData.makes,
    models: Object.entries(brandFilterData.models).flatMap(([make, models]) =>
      models.map(model => ({ make, model }))
    ),
    years: yearFilterData.years
  }), [])

  // Memoized search results
  const searchResults = useMemo(() => {
    if (!inputValue.trim()) return { makes: [], models: [], years: [] }

    const queryLower = inputValue.toLowerCase()
    const queryParts = queryLower.split(/\s+/)

    const makes = brandFilterData.makes.filter(make =>
      queryParts.some(part => make.toLowerCase().includes(part))
    )

    const models = Object.entries(brandFilterData.models).flatMap(([make, models]) =>
      models.filter(model =>
        queryParts.some(part => make.toLowerCase().includes(part) || model.toLowerCase().includes(part))
      ).map(model => ({ make, model }))
    )

    const years = yearFilterData.years.filter(year =>
      queryParts.some(part => year.value.includes(part))
    )

    return { makes, models, years }
  }, [inputValue])

  // Memoized check for search results
  const hasSearchResults = useMemo(() => 
    searchResults.makes.length > 0 || searchResults.models.length > 0 || searchResults.years.length > 0,
    [searchResults]
  )


  // Memoized callbacks
  const setQuery = useCallback((query: string) => dispatch(setSearch(query)), [dispatch])

  const onValueChange = useDebouncedCallback((query: string) => {
    setQuery(query)
    dispatch(filterPage({}))
  }, 500)

  const buildSearchParams = useCallback((value: string) => {
    const nextSearch: Partial<{
      value: string
      minPrice: number
      maxPrice: number
      selectedMakes: string
      selectedModels: string
      selectedTrims: string
      selectedBodyTypes: string[]
      selectedTransmission: FilterTransmissionType
    }> = {}
    
    if (value) nextSearch.value = value
    if (values.minPrice) nextSearch.minPrice = Number(values.minPrice)
    if (values.maxPrice) nextSearch.maxPrice = Number(values.maxPrice)
    if (values.selectedMakes) nextSearch.selectedMakes = values.selectedMakes
    if (values.selectedModels) nextSearch.selectedModels = values.selectedModels
    if (values.selectedTrims) nextSearch.selectedTrims = values.selectedTrims
    if (values.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = values.selectedBodyTypes
    if (values.selectedTransmission && values.selectedTransmission !== 'All') {
      nextSearch.selectedTransmission = values.selectedTransmission
    }
    
    return nextSearch
  }, [values])

  const navigateToSearch = useCallback((searchParams: Partial<{
    value: string
    minPrice: number
    maxPrice: number
    selectedMakes: string
    selectedModels: string
    selectedTrims: string
    selectedBodyTypes: string[]
    selectedTransmission: FilterTransmissionType
  }>) => {
    const nextLocation = router.buildLocation({
      from: '/search-result-page',
      to: '.',
      search: searchParams,
    })
    router.history.replace(nextLocation.href)
  }, [router])

  const onSelect = useCallback((value: string) => {
    setQuery(value)
    setOpen(false)
    dispatch(filterPage({}))
    
    const searchParams = buildSearchParams(value)
    navigateToSearch(searchParams)
  }, [setQuery, setOpen, dispatch, buildSearchParams, navigateToSearch])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (inputValue.trim()) {
        onValueChange(inputValue)
        setOpen(false)
      }
    }
  }, [inputValue, onValueChange, setOpen])

  return (
    <CommandDialog
      modal
      open={state.open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) setInputValue('')
      }}
    >
      <CommandInput
        placeholder='Type vehicle brands/models or search...'
        onValueChange={setInputValue}
        onKeyDown={handleKeyDown}
      />
      <CommandList >
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {hasSearchResults ? (
            <>
              {searchResults.makes.length > 0 && (
                <CommandGroup heading='Brands'>
                  {searchResults.makes.map((make) => (
                    <CommandItemWithIcon
                      key={`search-make-${make}`}
                      value={make}
                      onSelect={onSelect}
                    >
                      {make}
                    </CommandItemWithIcon>
                  ))}
                </CommandGroup>
              )}

              {searchResults.models.length > 0 && (
                <CommandGroup heading='Models'>
                  {searchResults.models.map(({ make, model }) => (
                    <CommandItemWithIcon
                      key={`search-model-${make}-${model}`}
                      value={`${make} ${model}`}
                      onSelect={onSelect}
                    >
                      {make} <ChevronRight /> {model}
                    </CommandItemWithIcon>
                  ))}
                </CommandGroup>
              )}

              {searchResults.years.length > 0 && (
                <CommandGroup heading='Years'>
                  {searchResults.years.map((year) => (
                    <CommandItemWithIcon
                      key={`search-year-${year.value}`}
                      value={year.value}
                      onSelect={onSelect}
                    >
                      {year.label}
                    </CommandItemWithIcon>
                  ))}
                </CommandGroup>
              )}
            </>
          ) : (
            <>
              {/* Nếu không có search result thì show suggestions */}
              <CommandGroup heading='Suggested Brands'>
                {suggestions.makes.map((make) => (
                  <CommandItemWithIcon
                    key={`suggestion-make-${make}`}
                    value={make}
                    onSelect={onSelect}
                  >
                    {make}
                  </CommandItemWithIcon>
                ))}
              </CommandGroup>

              <CommandGroup heading='Suggested Models'>
                {suggestions.models.map(({ make, model }) => (
                  <CommandItemWithIcon
                    key={`suggestion-model-${make}-${model}`}
                    value={`${make} ${model}`}
                    onSelect={onSelect}
                  >
                    {make} <ChevronRight /> {model}
                  </CommandItemWithIcon>
                ))}
              </CommandGroup>

              <CommandGroup heading='Suggested Years'>
                {suggestions.years.map((year) => (
                  <CommandItemWithIcon
                    key={`suggestion-year-${year.value}`}
                    value={year.value}
                    onSelect={onSelect}
                  >
                    {year.label}
                  </CommandItemWithIcon>
                ))}
              </CommandGroup>
            </>
          )}
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}

