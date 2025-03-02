import { createContext, SetStateAction, useContext, useState } from 'react'

interface SearchContextType {
  filter: string,
  setFilter: React.Dispatch<SetStateAction<string>>,
  search: string,
  setSearch: React.Dispatch<SetStateAction<string>>,

}

export const SearchContext = createContext<undefined | SearchContextType>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {

  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  const value = {
    filter, setFilter, search, setSearch
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within an SearchProvider");
  }
  return context;
}