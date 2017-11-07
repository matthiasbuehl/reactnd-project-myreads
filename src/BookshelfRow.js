import React from 'react'
import Book from './Book'

class BookshelfRow extends React.Component {
  render() {
    const { books, handleShelfChange } = this.props

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
}

export default BookshelfRow