import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
  state = {
    searchTerm: '',
    results: []
  }

  handleSearch(searchTerm) {
    this.setState( { searchTerm: searchTerm } )
    if (!searchTerm) this.setState({ results: [] })

    const maxResults = 100
    BooksAPI.search(searchTerm, maxResults).then(books => {
      this.setState({ results: Array.isArray(books) ? this.syncResultsWithBookshelf(books) : [] })
    }).catch(error => {
      console.log('search failed', error)
      this.setState({ results: [] })
    })
  }

  syncResultsWithBookshelf = (resultBooks) => {
    const { books } = this.props
    return resultBooks.map(rb => {
      rb.shelf = ''
      const bookMatch = books.filter(b => b.id === rb.id)
      if (bookMatch.length > 0) {
        rb.shelf = bookMatch[0].shelf
      }
      return rb
    })
  }

  render() {
    const { handleShelfChange } = this.props
    const { results, searchTerm } = this.state

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
        >Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={ searchTerm }
            placeholder="Search by title or author"
            onChange={ e => this.handleSearch(e.target.value) }
           />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { results.map(book =>
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