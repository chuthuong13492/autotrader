import { useContext, useEffect, useReducer } from 'react'
import { CommandMenu } from '@/components/command-menu'
import { SearchContext } from './context'

type SearchState = {
  open: boolean
  searchQuery: string
}

type SearchAction =
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_SEARCH'; payload: string }


const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, open: action.payload }
    case 'TOGGLE_OPEN':
      return { ...state, open: !state.open }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload }
    default:
      return state
  }
}

type SearchProviderProps = {
  children: React.ReactNode
}

export function SearchProvider({ children }: SearchProviderProps) {
  const [state, dispatch] = useReducer(searchReducer, {
    open: false,
    searchQuery: ''
  })


  const setOpen = (open: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: open })
  }

  const toggleOpen = () => {
    dispatch({ type: 'TOGGLE_OPEN' })
  }

  const setSearch = (searchQuery: string) => {
    dispatch({ type: 'SET_SEARCH', payload: searchQuery })
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

  return (
    <SearchContext.Provider value={{ state, setOpen, toggleOpen, setSearch }}>
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
