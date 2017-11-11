import React from 'react'

class Book extends React.Component {
  render() {
    const { book, handleShelfChange } = this.props
    const { title, authors, imageLinks, shelf } = book

    return (
      <div className="book">
      <div className="book-top">
        <div
          className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: imageLinks && `url(${imageLinks["thumbnail"]}`
        }}></div>
        <div className="book-shelf-changer">
          <select value={ shelf || 'none' } onChange={ e => handleShelfChange(book, e.target.value) }>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="remove">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{ title }</div>
      <div className="book-authors">{ authors }</div>
    </div>
    )
  }
}

export default Book