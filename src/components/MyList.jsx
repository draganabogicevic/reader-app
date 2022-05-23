import { useState } from 'react'

import TableBody from './TableBody'

import { Table, Thead,  Tr, Th,  useDisclosure } from '@chakra-ui/react'


const MyList = ({ list, setBooks }) => {
    const [note, setNote] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
   

    const onBookSet = (value) => {
        setBooks(value)
    }


    const handleDelete = (bookToRemove, listName) => {
        onBookSet(prev => {
            return prev.filter(item => item.title === bookToRemove)
        })
        
        if(list.name === listName) {
            list.removeBook(bookToRemove)
        }
        return null
    }

    const onNoteEdit = (value) => {
        setNote(value)
        
    }

     const handleEditNote = (bookToEdit) => {
        list.books.map(b => {
            if (b.title === bookToEdit) {
                b.note = note
            }
            onClose()
            return null
        })
    }
    

    // const handleEditQuote = (bookToEdit) => {
    //     list.books.map(b => {
    //         if (b.title === bookToEdit) {
    //             b.quote = quote
    //         }
    //         onClose()
    //         return null
    //     })
    // }
    
    return (
        <div>
            <h1>{list.name}</h1>
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
                {list.books.map(b => (
                    <TableBody book={b} onDelete={handleDelete} listName={list.name} note={note} editNote={onNoteEdit} editNoteHandler={handleEditNote}/>
                ))}
            </Table>
        </div>
    )
}


export default MyList