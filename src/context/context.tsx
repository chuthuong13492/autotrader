// search-context.ts
import { createContext } from "react"

export interface SearchContextType {
  state: { open: boolean }
  setOpen: (open: boolean) => void
  toggleOpen: () => void
}

export const SearchContext = createContext<SearchContextType | null>(null)