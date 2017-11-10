import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import AppWrapper from './AppWrapper'

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
      <AppWrapper
        bookshelves={ this.bookshelves }
        books={ this.state.books }
        handleShelfChange={ this.handleShelfChange }
      />
    )
  }
}

export default BooksApp
