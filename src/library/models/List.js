export default class List {
    constructor(name) {
        this.name = name
        this.books = []
        this.addBooks = function (book) {
            this.books.push(book)
        }
        this.removeBook = function (book) {
            let bookToRemove
            this.books.map(b => {
                if (b.title === book) {
                    bookToRemove = b
                }
            })
            this.books.splice(this.books.indexOf(bookToRemove), 1)
        }
    }
}