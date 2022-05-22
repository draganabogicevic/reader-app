import { Input, FormControl as CFormControl, FormLabel, Textarea, Select, FormErrorMessage } from '@chakra-ui/react'

const FormControl = ({ label, name, value, handler }) => {
    return (
        <CFormControl>
            <FormLabel>{label}</FormLabel>
            <Input type='text' name={name} value={value} onChange={e => handler(e.target.value)} />
        </CFormControl>  
    )
}

export default FormControl