import ModalWrapper from '../components/ModalWrapper'

import {  Select,  Button, Tbody, Tr, Td, Box, useDisclosure, Textarea } from '@chakra-ui/react'
import NoteModal from './NoteModal'


const TableBody = ({ book, onDelete, editNoteHandler, listName, editNote, note }) => {
   console.log(book)
    
    

    // const onQouteEdit = (value) => {
    //     setQuote(value)
    // }

    return (
        <Tbody>
            <Tr>
                <Td>{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>
                    <Box>{book.note}</Box>
                    <NoteModal editNoteHandler={editNoteHandler} editNote={editNote} book={book} note={ note}/>
                </Td>
                <Td>
                    <Box>{book.quotes}</Box>
                    {/* <Button onClick={onOpen}>Edit</Button> 
                    <ModalWrapper
                        isOpen={isOpen} 
                        onClose={onClose}
                        blockScrollOnMount={false}
                        color="okBlue"
                        size={'2xl'}
                    > 
                        <Textarea  onChange={e => setQuote(e.target.value)} />
                        <Box display='flex' flexDir='row' justify='space-between'>
                            <Button onClick={() => handleEditQuote(b.title)}>Save</Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </Box>
                    </ModalWrapper>  */}
                </Td>
                <Td>
                    <Select>
                        <option>In plan</option>
                        <option>Reading</option>
                        <option>Done</option>
                    </Select>
                </Td>
                <Td>
                    <Button onClick={() => onDelete(book.title, listName)}>Delete</Button>
                </Td>
            </Tr>
        </Tbody>
    )
}

export default TableBody