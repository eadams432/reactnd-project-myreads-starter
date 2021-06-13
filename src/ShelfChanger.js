import React from 'react';
import * as BooksAPI from './BooksAPI';

class ShelfChanger extends React.Component{

    state = {
        value: this.props.book.shelf ? this.props.book.shelf :  'none'
    } 

    changeShelf = (event) => {
        event.preventDefault();
        const { book } = this.props;
        const shelf = event.target.value;
        BooksAPI.update(book, shelf)
        .then(result=>{
            this.setState({
                value: shelf
            });
        });
    }

    render(){
        
        return(
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.changeShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

export default ShelfChanger;