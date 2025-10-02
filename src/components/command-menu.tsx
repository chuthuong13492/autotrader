import React, { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
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

export function CommandMenu() {
  const navigate = useNavigate()
  const { state, setOpen, setQuery } = useSearch()
  const [text, setText] = useState("");

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  useEffect(() => {
    setText(state.query ?? "")
  }, [state.query,],)

  const onValueChange = useDebouncedCallback((e) => {
    setQuery(e);
  }, 300)


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
                onSelect={() => {
                  setQuery(make)
                  runCommand(() =>
                    navigate({ to: '/search-result-page', search: { value: make } })
                  )
                }}
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
                  onSelect={() => {
                    const q = `${make} ${model}`
                    setQuery(q)
                    runCommand(() =>
                      navigate({ to: '/search-result-page', search: { value: q } })
                    )
                  }}
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
