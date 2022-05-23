import { Flex, Center, Spinner } from '@chakra-ui/react'

const Loader = () => {
    return (
        <Flex justify='center'>
            <Center mt='300px'>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Center>
        </Flex>
    )
}

export default Loader