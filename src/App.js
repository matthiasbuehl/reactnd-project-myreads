import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }
  bookshelves = [
    {
      key: 'currentlyReading',
      display: 'Currently Reading'
    },
    {
      key: 'wantToRead',
      display: 'Want to Read'
    },
    {
      key: 'read',
      display: 'Read'
    }
  ]

  booksByShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf )
  }

  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(res => {
      this.getBooks()
    }).catch(error => {
      console.log('error', error)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search
            books={ this.state.books }
            handleShelfChange={ this.handleShelfChange }
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.bookshelves.map(bs =>
                <Bookshelf
                  key={ bs.key }
                  name={ bs.display }
                  books={ this.booksByShelf(bs.key) }
                  handleShelfChange={ this.handleShelfChange }
                />
              )}
            </div>
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
