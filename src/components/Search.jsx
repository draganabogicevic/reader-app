import { useState } from 'react'

import { useSearchContext } from '../context/searchContext'

import { Box, FormControl, Input } from '@chakra-ui/react' 

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const { searchHandler } = useSearchContext()

    const handleSearch = query => {
        setSearchText(query)
        searchHandler(query)
    }
    
      
    return (
        <Box>
            <form>
                <FormControl>
                    <Input value={searchText} type='text' placeholder='Search for the title' onChange={ e => handleSearch(e.target.value)}/>
                </FormControl>
            </form>
        </Box>
    )
}

export default Search