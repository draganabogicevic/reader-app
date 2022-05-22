import { useState, useEffect } from 'react'
import { useAddNewBookContext } from '../context/addNewBookContext'
import Book from '../library/models/Book'
import Search from '../components/Search'
import { bookService } from '../library/services/service'
import { Input, Box, Heading, Text, FormControl, FormLabel, Textarea, Select, FormErrorMessage } from '@chakra-ui/react'

import { useSearchContext } from '../context/searchContext'

const HomePage = () => {
    
    const { setDataFromInput, books } = useAddNewBookContext()
    const { query } = useSearchContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [note, setNote] = useState('')
    const [quotes, setQuotes] = useState('')
    const [searchedBook, setSearchedBook] = useState()
   
    const hasFind = searchedBook !== undefined

    const handleSubmit = (event) => {
        event.preventDefault()
    }
    
    const dataInp = {
        title: title,
        author: author,
        note: note,
        quotes: quotes
    }



    const collectData = () => {
        const bookToAdd = new Book(dataInp.title, dataInp.author, dataInp.note, dataInp.quotes)  
        setDataFromInput (bookToAdd)
        setTitle('')
        setAuthor('')
        setNote('')
        setQuotes('')

    }

    const autoFillSearchedData = (title, author) => {
        const searchedBookToAdd = new Book(title, author)
        setTitle(searchedBookToAdd.title)
        setAuthor(searchedBookToAdd.author)
    }

    

    useEffect(() => {
        bookService.fetchBook(query).then(data => setSearchedBook(data))
    }, [query])

    console.log(searchedBook)
    console.log(title)
    console.log(hasFind)
    return (
        <Box>
            <Heading>Reader application</Heading>
            <Text>Welcome to Reader app! Find, track, note quotes from your favorite books. The one you read, you are reading and you would like to read. Make your custom reading list, edit or change it. All in one place. Simple. Efficiently. </Text>
            <Text>To create your reading list, please add all necessary data in fields below or search for the title in search field.</Text>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
                </FormControl>  
                <FormControl>
                    <FormLabel>Author</FormLabel>
                    <Input type='text' name='author' value={author} onChange={e => setAuthor(e.target.value)} />
                </FormControl>  
                <FormControl>
                    <FormLabel>Note</FormLabel>
                    <Textarea type='text' name='note' value={note} onChange={e => setNote(e.target.value)} />
                </FormControl>  
                <FormControl>
                    <FormLabel>Quotes</FormLabel>
                    <Textarea type='text' name='quotes' value={quotes} onChange={e => setQuotes(e.target.value)} />
                </FormControl>  
                <button onClick={() => collectData()}>Submit</button>
            </form>
           
                <Search />
            {hasFind && searchedBook.data.docs.map(b => (
                <div key={b._version_} onClick={() => autoFillSearchedData(b.title, b.author_name[0])}>{b.title}
                </div>

            ))}
        </Box>
    )
}

export default HomePage