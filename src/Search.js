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
    BooksAPI.search(searchTerm, maxResults).then(resp => {
      this.setState({ results: resp })
    }).catch(error => {
      console.log('search failed', error)
      this.setState({ results: [] })
    })
  }

  render() {
    const { handleShelfChange } = this.props

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
            value={ this.state.searchTerm }
            placeholder="Search by title or author"
            onChange={ e => this.handleSearch(e.target.value) }
           />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          { this.state.results.map(book =>
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