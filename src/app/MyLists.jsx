import { useState, useEffect } from 'react'

import { useAddNewBookContext } from '../context/addNewBookContext'
import List from '../library/models/List'

import { FormControl, FormLabel, Select, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react'

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
        console.log(selectedName)
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
  
    
    
    const handleDelete = (bookToRemove, listName) => {
        console.log(bookToRemove)
        console.log(listName)
        setBooks(prev => {
            return prev.filter(item => item.title === bookToRemove)
        })
        lists.map(l => {
            if(l.name === listName) {
                l.removeBook(bookToRemove)
            }
            return null
        })
    
    }
  
    console.log(lists)
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
               
                <div>
                    <h1>{l.name}</h1>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Title</Th>
                                <Th>Author</Th>
                                <Th>Note</Th>
                                <Th>Quotes</Th>
                                <Th>Status</Th>
                                <Th>Remove</Th>
                            </Tr>
                        </Thead>
                        {l.books.map(b => (
                            <Tbody>
                                <Tr>
                                    <Td>{b.title}</Td>
                                    <Td>{b.author}</Td>
                                    <Td>
                                        <Box>{b.note}</Box>
                                        <Button>Edit</Button>
                                    </Td>
                                    <Td>{b.quotes}</Td>
                                    <Td>
                                        <Select>
                                            <option>In plan</option>
                                            <option>Reading</option>
                                            <option>Done</option>
                                        </Select>
                                    </Td>
                                    <Td>
                                        <Button onClick={() => handleDelete(b.title, l.name)}>Delete</Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                            ))}
                    </Table>
                </div>
                
                        )}
                    
        </form>    
    )
    
}

export default MyLists