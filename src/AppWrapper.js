import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import Search from './Search'

function AppWrapper({ bookshelves, books, handleShelfChange }) {
  function booksByShelf(books, shelf) {
    return books.filter(book => book.shelf === shelf )
  }

  return (
    <div className="app">
      <Switch>
        <Route path='/search' render={() => (
          <Search
            books={ books }
            handleShelfChange={ handleShelfChange }
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {bookshelves.map(bs =>
                <Bookshelf
                  key={ bs.key }
                  name={ bs.display }
                  books={ booksByShelf(books, bs.key) }
                  handleShelfChange={ handleShelfChange }
                />
              )}
            </div>
            <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )}/>
        <Route render={() => (
          <div>Sorry, bad route</div>
        )}/>
      </Switch>
    </div>
  )
  }

export default AppWrapper
