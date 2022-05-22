import React, { useContext } from 'react'

export const AddNewBookContext = React.createContext({
    books: [],
    data: [],
    collectInputData: props => {},
})

export const useAddNewBookContext = () => {
    const ctx = useContext(AddNewBookContext)
    return ctx
}