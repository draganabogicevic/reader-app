import ModalWrapper from '../components/ModalWrapper'

import {  Button, Box, useDisclosure, Textarea } from '@chakra-ui/react'

const NoteModal = ({ book, editNote, editNoteHandler, note }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    

    return (
        <>
          <Button onClick={onOpen}>Edit</Button>
                <ModalWrapper
                    isOpen={isOpen} 
                    onClose={onClose}
                    blockScrollOnMount={false}
                    color="okBlue"
                    size={'2xl'}
                > 
                    <Textarea defaultValue={note} onChange={e => editNote(e.target.value)} />
                    <Box display='flex' flexDir='row' justify='space-between'>
                        <Button onClick={() => { editNoteHandler(book.title); onClose() }}>Save</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </Box>
                </ModalWrapper>
            </>
    )
}

export default NoteModal