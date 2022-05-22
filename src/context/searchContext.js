import React, { useContext } from 'react'

export const SearchContext = React.createContext({
    query: '',
    searchHandler: () => {}
})

export const useSearchContext = () => {
    const ctx = useContext(SearchContext)
    return ctx
}