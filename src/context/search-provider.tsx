import {  useContext, useEffect, useReducer } from 'react'
import { CommandMenu } from '@/components/command-menu'
import { SearchContext } from './context'

type SearchState = {
  open: boolean
  query?: string
}

type SearchAction =
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'TOGGLE_OPEN' }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'CLEAR_QUERY' }


const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_OPEN':
      return { ...state, open: action.payload }
    case 'TOGGLE_OPEN':
      return { ...state, open: !state.open }
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'CLEAR_QUERY':
      return { ...state, query: '' }
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
    query: ''
  })

  const setOpen = (open: boolean) => {
    dispatch({ type: 'SET_OPEN', payload: open })
  }

  const toggleOpen = () => {
    dispatch({ type: 'TOGGLE_OPEN' })
  }

  const setQuery = (query: string) => {
    dispatch({ type: 'SET_QUERY', payload: query })
  }

  const clearQuery = () => {
    dispatch({ type: 'CLEAR_QUERY' })
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
    <SearchContext.Provider value={{ state, setOpen, toggleOpen, setQuery, clearQuery }}>
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
