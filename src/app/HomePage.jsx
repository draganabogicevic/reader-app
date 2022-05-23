import { useState } from 'react'
import { useAddNewBookContext } from '../context/addNewBookContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Book from '../library/models/Book'
import Search from '../components/Search'
import FallbackUi from '../components/FallbackUi'
import { bookService } from '../library/services/service'
import { useSearchContext } from '../context/searchContext'

import { Input, Box, Heading, Text, FormControl, FormLabel, Textarea, Button } from '@chakra-ui/react'

const validationSchema = yup.object(
    {
        title: yup
            .string()
            .required('This field is required'),
        author: yup
            .string()
            .min(6, 'The author name and surname must have at least 6 letters.'),
    }
)


const HomePage = () => {
    
    const { setDataFromInput } = useAddNewBookContext()
    const { query } = useSearchContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [note, setNote] = useState('')
    const [quotes, setQuotes] = useState('')
    const [data, setData] = useState()
    const [error, setError] = useState('')
    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })


    const search = () => {
        bookService.fetchBook(query)
                .then(data => setData(data))
                .catch(error => {
                    setError(error.message)
                })
    }
   
    const hasFind = data !== undefined
    
    const onSubmit = (data) => console.log(data)

    const dataInp = {
        title: title,
        author: author,
        note: note,
        quotes: quotes
    }


    const collectData = () => {
      
        const bookToAdd = new Book(dataInp.title, dataInp.author, dataInp.note, dataInp.quotes)
        if (bookToAdd.title) {
            setDataFromInput(bookToAdd)
        }    
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

    if (error) {
        return <FallbackUi error={error} />
    }

   

    console.log(data)
    console.log(title)
    console.log(hasFind)
 
    return (
        <Box>
            <Heading>Reader application</Heading>
            <Text>Welcome to Reader app! Find, track, note quotes from your favorite books. The one you read, you are reading and you would like to read. Make your custom reading list, edit or change it. All in one place. Simple. Efficiently. </Text>
            <Text>To create your reading list, please add all necessary data in fields below or search for the title in search field.</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input {...register('title')} type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
                    <Text>{errors.title?.message}</Text>
                </FormControl>  
                <FormControl>
                    <FormLabel>Author</FormLabel>
                    <Input {...register('author')} type='text' name='author' value={author} onChange={e => setAuthor(e.target.value)} />
                    <Text>{errors.author?.message}</Text>
                </FormControl>  
                <FormControl>
                    <FormLabel>Note</FormLabel>
                    <Textarea type='text' name='note' value={note} onChange={e => setNote(e.target.value)} />
                </FormControl>  
                <FormControl>
                    <FormLabel>Quotes</FormLabel>
                    <Textarea type='text' name='quotes' value={quotes} onChange={e => setQuotes(e.target.value)} />
                </FormControl>  
                <Button type='submit' onClick={() => collectData()}>Submit</Button>
            </form>
           
            <Search />
            <Button onClick={() => search()}>Search</Button>
            {hasFind && data.data.docs.map(b => (
                <div key={b._version_} onClick={() => autoFillSearchedData(b.title, b.author_name[0])}>{b.title}
                </div>

            ))}
        </Box>
    )
}

export default HomePage