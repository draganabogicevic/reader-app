import { ChakraProvider } from '@chakra-ui/react'
import Header from '../components/Header'
import Main from './Main'
import AddNewBookContextProvider from '../context/AddNewBookContextProvider'
import { SearchContextProvider } from '../context/SearchContextProvider'
import './App.css'

function App() {
  return (
    <ChakraProvider>
      <Header />  
      <AddNewBookContextProvider>
        <SearchContextProvider>
          <Main />
        </SearchContextProvider>
      </AddNewBookContextProvider>
    </ChakraProvider>
  )
}

export default App;
