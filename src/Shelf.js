import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Shelf extends React.Component{

    render(){
        const { shelfTitle, shelfCategory , books, shelfChange } = this.props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelfTitle}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(book=>(
                            <li key={book.id}>
                                <Book book={book} shelf={shelfCategory} shelfChange={shelfChange}/>
                            </li>
                        ))}
                    </ol>
                  </div>
                </div>
        );
    }

}

Shelf.propTypes = {
    shelfTitle : PropTypes.string.isRequired,
    shelfCategory: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    shelfChange: PropTypes.func
}

export default Shelf;
