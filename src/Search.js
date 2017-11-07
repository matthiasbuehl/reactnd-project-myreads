import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'

class Search extends React.Component {
  state = {
    searchTerm: ''
  }

  handleSearch(books, searchTerm) {
    this.setState( {searchTerm: searchTerm.trim()} )
  }

  filterBooks(books, searchTerm) {
    if (! searchTerm) return []

    const match = new RegExp(escapeRegExp(searchTerm), 'i')
    return books.filter(book => match.test(book.title) )
  }

  render() {
    const { books, handleShelfChange } = this.props
    const { searchTerm } = this.state
    const bookResults = this.filterBooks(books, searchTerm)

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >Close
        </Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={e => this.handleSearch(books, e.target.value) }
           />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { bookResults.map(book =>
            <li key={ book.id }>
              <Book
                book={ book }
                handleShelfChange={ handleShelfChange }
              />
            </li>
          )}
        </ol>
      </div>
    </div>
    )
  }
}

export default Search