import React from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class ShelfChanger extends React.Component{

    state = {
        value: this.props.shelf ? this.props.shelf :  ''
    } 

    changeShelf = (event) => {
        event.preventDefault();
        const { book } = this.props;
        const newShelf = event.target.value;
        const currentShelf = this.state.value;
        BooksAPI.update(book, newShelf)
            .then(result=>{
                this.setState({
                    value: newShelf
                });
                this.props.updateShelf(currentShelf, newShelf);
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

ShelfChanger.propTypes = {
    shelf: PropTypes.string,
    book: PropTypes.object.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default ShelfChanger;