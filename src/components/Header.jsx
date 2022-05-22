import { Link } from 'react-router-dom'
import {
    Menu,
    Flex,
    Box,
    HStack
} from '@chakra-ui/react'

const Header = () => {
    return (
        <Menu>
            <Flex justifyContent='space-between'>
                <Box>
                    <h1>Reader app</h1>
                </Box>
                <Box>
                    <HStack spacing={4}>
                        <Link to='/'>Home</Link>
                        <Link to='/myLists'>My list</Link>
                    </HStack>
                </Box>
            </Flex>
        </Menu>
    )
}

export default Header