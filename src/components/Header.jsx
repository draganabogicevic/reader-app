import { Link } from 'react-router-dom'

import {
    Menu,
    Flex,
    Box,
    HStack, 
    Icon
} from '@chakra-ui/react'
import { ImBooks } from "react-icons/im";

import style from './Header.module.css'

const Header = () => {
    return (
        <Menu>
            <Flex justifyContent='space-between'>
                <Box display='flex' flexDir='row' alignItems='center' ml='30px'>
                    <Icon as={ImBooks} fontSize={['20px', '20px','30px']} />
                    <h1 className={style.logo} fontSize={['20px', '20px','30px']}>Reader app</h1>
                </Box>
                <Box>
                    <HStack spacing={4} mr='30px'>
                        <Link to='/'>Home</Link>
                        <Link to='/myLists'>My list</Link>
                    </HStack>
                </Box>
            </Flex>
        </Menu>
    )
}

export default Header