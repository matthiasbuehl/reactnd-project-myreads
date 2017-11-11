import React from 'react'
import BookshelfRow from './BookshelfRow'

const Bookshelf = ({ name, books, handleShelfChange }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ name }</h2>
      <BookshelfRow
        books={ books }
        handleShelfChange={ handleShelfChange }
      />
    </div>
  )
}

export default Bookshelf