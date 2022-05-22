import { useState } from 'react'
import { SearchContext } from './searchContext'

export const SearchContextProvider = props => {
    const [query, setQuery] = useState('')

    const searchHandler = (text) => {
        setQuery(text)
    }


    const searchContextProviderValue = {
        query,
        searchHandler
    }

   
    return (
        <SearchContext.Provider value={searchContextProviderValue}>
            {props.children}
        </SearchContext.Provider>
    )
}    