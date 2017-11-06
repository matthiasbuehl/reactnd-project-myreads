import React from 'react'
import BookshelfRow from './BookshelfRow'

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.name }</h2>
        <BookshelfRow books={ this.props.books } />
      </div>
    )
  }
}

export default Bookshelf