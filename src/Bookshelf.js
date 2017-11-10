import React from 'react'
import BookshelfRow from './BookshelfRow'

class Bookshelf extends React.Component {
  render() {
    const { name, handleShelfChange } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ name }</h2>
        <BookshelfRow
          books={ this.props.books }
          handleShelfChange={ handleShelfChange }
        />
      </div>
    )
  }
}

export default Bookshelf