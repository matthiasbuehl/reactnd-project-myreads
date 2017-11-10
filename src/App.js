import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
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
      book.shelf = newShelf
      this.setState(prevState => {
        books: prevState.books.filter(pb => pb.id !== book.id).concat([book])
      })
    }).catch(error => {
      console.log('error', error)
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
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
          <Route render={() => (
            <div>bad route</div>
          )}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
