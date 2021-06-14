import React from 'react';
import ShelfChanger from './ShelfChanger';
import PropTypes from 'prop-types';

class Book extends React.Component{

    // state = {
    //     shelf: this.props.shelf
    // }

    updateShelf = (sourceShelf, newShelf) =>{
        if(this.props.shelfChange){
            this.props.shelfChange(sourceShelf, newShelf, this.props.book);
        }
    }

    render(){
        const { title, authors, imageLinks } = this.props.book;
        const authorsList = authors ? authors.map((author,index,array)=> index < array.length-1 ? author + ', ' : author)  : 'Unknown';
        const imageElement = imageLinks && imageLinks.smallThumbnail ? 
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}></div>
            :
            <div>No cover available</div>
        return(
            <div className="book">
                <div className="book-top">
                    {imageElement}
                    <ShelfChanger book={this.props.book} updateShelf={this.updateShelf} shelf={this.props.shelf}/>
                </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authorsList}</div>
            </div>
        );
    }
}

Book.propTypes = {
    book : PropTypes.object.isRequired,
    shelfChange : PropTypes.func,
    shelf: PropTypes.string
}

export default Book;