// search-context.ts
import { createContext } from "react"

export interface SearchContextType {
  state: { open: boolean; searchQuery: string }
  setOpen: (open: boolean) => void
  toggleOpen: () => void
  setSearch: (searchQuery: string) => void
}

export const SearchContext = createContext<SearchContextType | null>(null)