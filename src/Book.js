import React from 'react';
import ShelfChanger from './ShelfChanger';

class Book extends React.Component{

    state = {
        shelf: this.props.shelf,
        status: this.props.status,
    }

    render(){
        const { title, authors, imageLinks } = this.props.book;
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
                    <ShelfChanger />
                </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.map(author=>author + ', ')}</div>
            </div>
        );
    }
}

export default Book;