import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

class BookList extends React.Component {
  booksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf )
  }

  render() {
    const { bookshelves, books, handleShelfChange } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          { bookshelves.map(bs =>
            <Bookshelf
              key={ bs.key }
              name={ bs.display }
              books={ this.booksByShelf(books, bs.key) }
              handleShelfChange={ handleShelfChange }
            />
          ) }
        </div>
        <div className="open-search">
          <Link to="/search">Search</Link>
        </div>
      </div>
    )}
  }

export default BookList
