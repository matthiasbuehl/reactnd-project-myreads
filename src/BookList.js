import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

function BookList({ bookshelves, books, handleShelfChange }) {
  function booksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf )
  }

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
            books={ booksByShelf(books, bs.key) }
            handleShelfChange={ handleShelfChange }
          />
        ) }
      </div>
      <div className="open-search">
        <Link to="/search">Search</Link>
      </div>
    </div>
  )}

export default BookList
