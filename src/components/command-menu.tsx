import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useDebouncedCallback } from 'use-debounce'
import { brandFilterData } from '@/features/dashboard/data/filter-data'
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

  const [text, setText] = useState("");

  const search = useSelector((state: DashboardRootState) => state.dashboard.search)

  const values = useSelector((state: DashboardRootState) => state.dashboard.values)


  const dispatch = useDispatch<DashboardDispatch>()


  useEffect(() => {
    setText(search ?? "")
  }, [search])

  const setQuery = (e: string) => dispatch(setSearch(e));

  const onValueChange = useDebouncedCallback((e) => {
    setQuery(e);
    dispatch(filterPage(1))
  }, 300)

  const onSelect = (e: string) => {
    setQuery(e)
    setOpen(false)
    dispatch(filterPage(1))

    const nextSearch: Partial<{
      value: string
      minPrice: number
      maxPrice: number
      selectedMakes: string[]
      selectedModels: string[]
      selectedTrims: string[]
      selectedBodyTypes: string[]
      selectedTransmission: FilterTransmissionType
    }> = {}
    if (e) nextSearch.value = e
    if (values.minPrice) nextSearch.minPrice = Number(values.minPrice)
    if (values.maxPrice) nextSearch.maxPrice = Number(values.maxPrice)
    if (values.selectedMakes?.length) nextSearch.selectedMakes = values.selectedMakes
    if (values.selectedModels?.length) nextSearch.selectedModels = values.selectedModels
    if (values.selectedTrims?.length) nextSearch.selectedTrims = values.selectedTrims
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
    <CommandDialog modal open={state.open} onOpenChange={setOpen}>
      <CommandInput
        placeholder='Type vehicle brands/models or search...'
        value={text}
        onValueChange={(e) => {
          setText(e);
          onValueChange(e)
        }}
      />
      <CommandList>
        <ScrollArea type='hover' className='h-72 pe-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {/* Brand/Model Suggestions */}
          <CommandGroup heading='Brands'>
            {brandFilterData.makes.map((make) => (
              <CommandItem
                key={`make-${make}`}
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

          <CommandGroup heading='Models'>
            {Object.entries(brandFilterData.models).flatMap(([make, models]) =>
              models.map((model) => (
                <CommandItem
                  key={`model-${make}-${model}`}
                  value={`${make} ${model}`}
                  onSelect={() => onSelect(`${make} ${model}`)}
                >
                  <div className='flex size-4 items-center justify-center'>
                    <ArrowRight className='text-muted-foreground/80 size-2' />
                  </div>
                  {make} <ChevronRight /> {model}
                </CommandItem>
              ))
            )}
          </CommandGroup>


          {/* <CommandSeparator /> */}
          {/* <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup> */}
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}

