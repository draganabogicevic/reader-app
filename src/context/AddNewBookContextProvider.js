import { useState } from 'react'
import { AddNewBookContext } from './addNewBookContext'

const AddNewBookContextProvider = props => {
    const [data, setData] = useState([])

    const setDataFromInput = (book) => {
        setData(prev => {
            return [...prev, book]
        })
    }

    console.log(data)

    const addNewBookContextValue = {
        data,
        setDataFromInput 
    }

    return (
        <AddNewBookContext.Provider value={addNewBookContextValue}>
            {props.children}
        </AddNewBookContext.Provider>
    )
}

export default AddNewBookContextProvider