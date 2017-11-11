import React from 'react'
import Book from './Book'

const BookshelfRow = ({books, handleShelfChange}) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        { books.map( book =>
          <li key={ book.id }>
            <Book
              book={ book }
              handleShelfChange={ handleShelfChange }
            />
          </li>
        )}
      </ol>
    </div>
  )
}

export default BookshelfRow