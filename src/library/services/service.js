import { Api } from '../api/api'

class BookService {
    async fetchBook(path) {
        const book = await Api.get(path)
        console.log(book)
        return book
    }
}

export const bookService = new BookService()