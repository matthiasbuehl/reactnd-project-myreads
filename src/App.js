import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import BookList from './BookList'
import Error404 from './Error404'

class BooksApp extends React.Component {
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

  state = {
    books: []
  }

  booksByShelf(shelf) {
    return this.state.books.filter(book => book.shelf === shelf )
  }

  handleShelfChange = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(res => {
      book.shelf = newShelf
      this.setState(prevState => ({
          books: prevState.books.filter(pb => pb.id !== book.id).concat([book])
        })
      )
    }).catch(error => {
      console.log('error', error)
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch(error => {
      console.log('error getting all books', error)
    })
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render={() => (
            <Search
              handleShelfChange={ this.handleShelfChange }
              handleSearch={ this.handleSearch }
            />
          )}/>
          <Route exact path='/' render={() => (
            <BookList
              bookshelves={ this.bookshelves }
              books={ this.state.books }
              handleShelfChange={ this.handleShelfChange }
            />
          )}/>
          <Route component={ Error404 }/>
        </Switch>
    </div>
    )
  }
}

export default BooksApp
