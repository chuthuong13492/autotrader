import { useContext, useEffect, useReducer } from 'react'
import { CommandMenu } from '@/components/command-menu'
import { SearchContext } from './context'
import { setForm, setSearch } from '@/stores/dashboard-slice'
import { type DashboardDispatch } from '@/stores/dashboard-store'
import { useDispatch } from 'react-redux'
import { useSearch as useRouteSearch } from '@tanstack/react-router'
import { type FilterTransmissionType, type FormData } from '@/features/dashboard/components/dashboard-filter'


type SearchState = {
  open: boolean
}

type SearchAction =
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'TOGGLE_OPEN' }


const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, open: action.payload }
    case 'TOGGLE_OPEN':
      return { ...state, open: !state.open }
    default:
      return state
  }
}

type SearchProviderProps = {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, {
    open: false
  })

  const reduxDispatch = useDispatch<DashboardDispatch>()

  const routeSearch = useRouteSearch({ from: '/_dashboard/search-result-page/' })

  const setOpen = (open: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: open })
  }

  const toggleOpen = () => {
    dispatch({ type: 'TOGGLE_OPEN' })
  }


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleOpen()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    const s = routeSearch ?? {}

    if (s.value !== undefined) {
      const v = String(s.value ?? '')
      reduxDispatch(setSearch(v))
    }
    const initValues: Partial<FormData> = {
      minPrice: '',
      maxPrice: '',
      selectedMakes: [],
      selectedModels: [],
      selectedTrims: [],
      selectedBodyTypes: [],
      selectedTransmission: 'All',
    }

    if (s.minPrice !== undefined) initValues.minPrice = String(s.minPrice)

    if (s.maxPrice !== undefined) initValues.maxPrice = String(s.maxPrice)

    if (s.selectedMakes?.length) initValues.selectedMakes = s.selectedMakes

    if (s.selectedModels?.length) initValues.selectedModels = s.selectedModels

    if (s.selectedTrims?.length) initValues.selectedTrims = s.selectedTrims

    if (s.selectedBodyTypes?.length) initValues.selectedBodyTypes = s.selectedBodyTypes

    if (s.selectedTransmission !== undefined) initValues.selectedTransmission = (s.selectedTransmission as FilterTransmissionType) ?? "All"

    reduxDispatch(setForm({ ...initValues, isDirty: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SearchContext.Provider value={{ state, setOpen, toggleOpen }}>
      {children}
      <CommandMenu />
    </SearchContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw new Error('useSearch has to be used within SearchProvider')
  }

  return searchContext
}
