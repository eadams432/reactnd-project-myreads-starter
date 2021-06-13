import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Shelf from './Shelf';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    let booksArray = [];
    BooksAPI.getAll().then((allBooks) => {
      booksArray = [...allBooks];
      console.log(booksArray);

      allBooks.map((book) => {
        if (book.shelf) {
          return this.setState((prevState) => ({
            [book.shelf]: [...prevState[book.shelf], book],
          }));
        } else {
          return this.setState({
            currentlyReading: [],
            wantToRead: [],
            read: [],
          });
        }
      });
    });
  }

  onChangeShelf = (sourceShelf, targetShelf, changedBook) => {
    this.setState((prevState) => ({
      [sourceShelf]: prevState[sourceShelf].filter(
        (book) => book.title !== changedBook.title
      ),
      [targetShelf]: [...prevState.targetShelf, changedBook],
    }));
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf
                  shelfTitle={"Currently Reading"}
                  books={this.state.currentlyReading}
                  shelfChange = {this.onChangeShelf}
                />
                <Shelf
                  shelfTitle={"Want to Read"}
                  books={this.state.wantToRead}
                  shelfChange = {this.onChangeShelf}
                />
                <Shelf 
                  shelfTitle={"Read"} 
                  books={this.state.read} 
                  shelfChange = {this.onChangeShelf}
                  />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp
