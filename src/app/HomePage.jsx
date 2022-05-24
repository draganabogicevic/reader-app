import { useState } from 'react'
import { useAddNewBookContext } from '../context/addNewBookContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import Book from '../library/models/Book'
import Search from '../components/Search'
import FallbackUi from '../components/FallbackUi'
import { bookService } from '../library/services/service'
import { useSearchContext } from '../context/searchContext'

import { Input, Box, Heading, Text, FormControl, FormLabel, InputGroup, Button, InputLeftAddon } from '@chakra-ui/react'

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

 
    return (
        <Box minHeight='100vh' mx={['20px', '20px', 0]} bgImage='url(https://img.freepik.com/free-photo/book-with-opened-pages-shape-heart-isolated-white-backg_1232-1696.jpg?t=st=1653388820~exp=1653389420~hmac=f00d848ca6a433faac47aa371c105704c4287b3f12b0cf4a4ebcd80ac36d1296&w=1480)' bgPosition='top' bgRepeat="no-repeat">
            <Box maxWidth={['100%', '100%', '50%']} m='auto' textAlign='center'>
                <Heading mt='70px' mb='30px'>Reader application</Heading>
                <Text mb='20px'>Welcome to Reader app! Find, track, note quotes from your favorite books. The one you read, you are reading and you would like to read. Make your custom reading list, edit or change it. All in one place. Simple. Efficiently. </Text>
                <Text>To create your reading list, please add all necessary data in fields below or search for the title in search field.</Text>
            </Box>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box maxWidth={['100%', '100%', '50%']} m='auto' mt='30px'>
                    <FormControl mb='20px'>
                        <InputGroup>
                            <InputLeftAddon children='Title' />
                            <Input {...register('title')} type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
                        </InputGroup>
                        <Text>{errors.title?.message}</Text>
                    </FormControl>  
                    <FormControl mb='20px'>
                        <InputGroup>
                            <InputLeftAddon children='Author' />
                            <Input {...register('author')} type='text' name='author' value={author} onChange={e => setAuthor(e.target.value)} />
                        </InputGroup>
                        <Text>{errors.author?.message}</Text>
                    </FormControl>  
                    
            
                    <Search />
                    <Box display='flex' flexDir='row' justifyContent='space-between' mt='20px' mb='150px'>
                        <Button onClick={() => search()}>Search</Button>
                        <Box>
                            <Button mr='10px' type='submit' onClick={() => collectData()}>Submit</Button>
                            <Button><Link to='/myLists'>My lists</Link></Button>
                        </Box>
                    </Box>
                    
                </Box>
            </form>
            <Box display='flex' flexDir='row' flexWrap='wrap' justifyContent='center' maxWidth={['100%', '100%', '80%']} m='auto'>
                {hasFind && data.data.docs.map(b => (
                    <div key={b._version_} onClick={() => autoFillSearchedData(b.title, b.author_name[0])}>
                        <Box padding='20px' margin='10px' border='1px solid black' borderRadius='10px' bg='white'>{b.title}</Box>
                    </div>
                ))}
            </Box>
           
            
        </Box>
    )
}

export default HomePage