import React from 'react'
import Book from './Book'

class BookshelfRow extends React.Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { this.props.books.map( book =>
            <li key={ book.id }><Book book={ book }/></li>
          )}
        </ol>
      </div>
    )
  }
}

export default BookshelfRow