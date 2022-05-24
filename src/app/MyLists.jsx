import { useState, useEffect } from 'react'

import { useAddNewBookContext } from '../context/addNewBookContext'
import MyList from '../components/MyList'

import List from '../library/models/List'

import { FormControl, FormLabel, Select, Input, Button } from '@chakra-ui/react'

const MyLists = () => {
    const { data } = useAddNewBookContext()
    const [newListName, setNewListName] = useState('')
    const [listNames, setListNames] = useState([])
    const [selectedName, setSelectedName] = useState('')
    const [selectedTitle, setSelectedBook] = useState('')
    const [newList, setNewList] = useState({})
    const [books, setBooks] = useState([])
    const [lists, setLists] = useState([])
   

    const isListCreated = newList.name !== undefined

    const addNewListNameToSelect = (newName) => {
        setListNames(prev => {
            return [...prev, newName]
        })
        setNewListName('')
    }
    
    const onNameSelect = (e) => {
        setSelectedName(e.target.value)
    }

    const onBookSelect = (e) => {
        setSelectedBook(e.target.value)
    }

   

    let selectedBook;
    data.map(b => selectedTitle === b.title ? (selectedBook = b) : null)

    const handleListCreate = () => {
        const list = new List(selectedName)
        list.addBooks(selectedBook)
        setBooks(list.books)
        setNewList(list)
        setLists([...lists, list])
    }


  
    const addNewBook = (newBook) => {
        setBooks([...books, newBook])
        lists.map(l => {
            if (l.name === selectedName) {
                l.addBooks(newBook)
            } 
            return null
        })
    }
  
  
   
  
    
    return (
        <form>
            <FormControl>
                <FormLabel>Add list name</FormLabel>
                <Input value={newListName} type='text' onChange={e => setNewListName(e.target.value)} />
                <Button onClick={() => addNewListNameToSelect(newListName)}>Add new list name</Button>
            </FormControl>
            <FormControl>
                <FormLabel>List Name</FormLabel>
                <Select value={selectedName} onChange={onNameSelect}>
                    <option>Choose list name</option>
                    {listNames?.map((n, index) => (
                        <option key={`${index}${n}`}>{n}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Add book to the list: </FormLabel>
                <Select value={selectedTitle} onChange={onBookSelect}>
                    <option>Choose book</option>
                    {data?.map((b, index) => (
                        <option key={`${index}${b.title}`}>{b.title}</option>
                    ))}
                </Select>
            </FormControl>
            <Button mr={4} onClick={() => handleListCreate(selectedTitle)}>Create list</Button>
            <Button onClick={() => addNewBook(selectedBook)}>Add new book to the list</Button>
            {isListCreated && lists?.map(l => 
                <MyList list={l} setBooks={setBooks} />
            )}
                    
        </form>    
    )
    
}

export default MyLists