
import { useState } from 'react'
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

export function CommandMenu() {
  const router = useRouter()

  const { state, setOpen } = useSearch()


  const values = useSelector((state: DashboardRootState) => state.dashboard.values)

  const dispatch = useDispatch<DashboardDispatch>()

  // Local state for current input value
  const [inputValue, setInputValue] = useState('')

  // Search results function
  const getSearchResults = (query: string) => {
    if (!query.trim()) return { makes: [], models: [], years: [] }

    const queryLower = query.toLowerCase()
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
  }

  // Suggestions function (always returns all data)
  const getSuggestions = () => {
    return {
      makes: brandFilterData.makes,
      models: Object.entries(brandFilterData.models).flatMap(([make, models]) =>
        models.map(model => ({ make, model }))
      ),
      years: yearFilterData.years
    }
  }

  const searchResults = getSearchResults(inputValue)
  const suggestions = getSuggestions()

  // Check if we have search results
  const hasSearchResults = searchResults.makes.length > 0 || searchResults.models.length > 0 || searchResults.years.length > 0


  const setQuery = (e: string) => dispatch(setSearch(e));

  const onValueChange = useDebouncedCallback((e) => {
    setQuery(e);
    dispatch(filterPage({}))
  }, 500)

  const onSelect = (e: string) => {
    setQuery(e)
    setOpen(false)
    dispatch(filterPage({}))

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
    if (e) nextSearch.value = e
    if (values.minPrice) nextSearch.minPrice = Number(values.minPrice)
    if (values.maxPrice) nextSearch.maxPrice = Number(values.maxPrice)
    if (values.selectedMakes) nextSearch.selectedMakes = values.selectedMakes
    if (values.selectedModels) nextSearch.selectedModels = values.selectedModels
    if (values.selectedTrims) nextSearch.selectedTrims = values.selectedTrims
    if (values.selectedBodyTypes?.length) nextSearch.selectedBodyTypes = values.selectedBodyTypes
    if (values.selectedTransmission && values.selectedTransmission !== 'All') {
      nextSearch.selectedTransmission = values.selectedTransmission
    }

    const nextLocation = router.buildLocation({
      from: '/search-result-page',
      to: '.',
      search: nextSearch,
    })
    router.history.replace(nextLocation.href)
  }

  return (
    <CommandDialog
      modal
      open={state.open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) setInputValue('') // Reset input when closing
      }}
    >
      <CommandInput
        placeholder='Type vehicle brands/models or search...'
        onValueChange={setInputValue}
        onSubmit={() => onValueChange(inputValue)}
      />
      <CommandList >
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {hasSearchResults ? (
            <>
              {searchResults.makes.length > 0 && (
                <CommandGroup heading='Brands'>
                  {searchResults.makes.map((make) => (
                    <CommandItem
                      key={`search-make-${make}`}
                      value={make}
                      onSelect={() => onSelect(make)}
                    >
                      <div className='flex size-4 items-center justify-center'>
                        <ArrowRight className='text-muted-foreground/80 size-2' />
                      </div>
                      {make}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults.models.length > 0 && (
                <CommandGroup heading='Models'>
                  {searchResults.models.map(({ make, model }) => (
                    <CommandItem
                      key={`search-model-${make}-${model}`}
                      value={`${make} ${model}`}
                      onSelect={() => onSelect(`${make} ${model}`)}
                    >
                      <div className='flex size-4 items-center justify-center'>
                        <ArrowRight className='text-muted-foreground/80 size-2' />
                      </div>
                      {make} <ChevronRight /> {model}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults.years.length > 0 && (
                <CommandGroup heading='Years'>
                  {searchResults.years.map((year) => (
                    <CommandItem
                      key={`search-year-${year.value}`}
                      value={year.value}
                      onSelect={() => onSelect(year.value)}
                    >
                      <div className='flex size-4 items-center justify-center'>
                        <ArrowRight className='text-muted-foreground/80 size-2' />
                      </div>
                      {year.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          ) : (
            <>
              {/* Nếu không có search result thì show suggestions */}
              <CommandGroup heading='Suggested Brands'>
                {suggestions.makes.map((make) => (
                  <CommandItem
                    key={`suggestion-make-${make}`}
                    value={make}
                    onSelect={() => onSelect(make)}
                  >
                    <div className='flex size-4 items-center justify-center'>
                      <ArrowRight className='text-muted-foreground/80 size-2' />
                    </div>
                    {make}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading='Suggested Models'>
                {suggestions.models.map(({ make, model }) => (
                  <CommandItem
                    key={`suggestion-model-${make}-${model}`}
                    value={`${make} ${model}`}
                    onSelect={() => onSelect(`${make} ${model}`)}
                  >
                    <div className='flex size-4 items-center justify-center'>
                      <ArrowRight className='text-muted-foreground/80 size-2' />
                    </div>
                    {make} <ChevronRight /> {model}
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading='Suggested Years'>
                {suggestions.years.map((year) => (
                  <CommandItem
                    key={`suggestion-year-${year.value}`}
                    value={year.value}
                    onSelect={() => onSelect(year.value)}
                  >
                    <div className='flex size-4 items-center justify-center'>
                      <ArrowRight className='text-muted-foreground/80 size-2' />
                    </div>
                    {year.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}

