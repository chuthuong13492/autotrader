// search-context.ts
import { createContext } from "react"

export interface SearchContextType {
  state: { open: boolean; query?: string }
  setOpen: (open: boolean) => void
  toggleOpen: () => void
  setQuery: (query: string) => void
  clearQuery: () => void
}

export const SearchContext = createContext<SearchContextType | null>(null)