import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage';
import Shelf from './Shelf';
import { Link, Route } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none:[]
  };

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
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
        (book) => book.id !== changedBook.id
      ),
      [targetShelf]: [...prevState[targetShelf], changedBook],
    }));
  };
  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                shelfTitle={"Currently Reading"}
                shelfCategory={'currentlyReading'}
                books={this.state.currentlyReading}
                shelfChange = {this.onChangeShelf}
              />
              <Shelf
                shelfTitle={"Want to Read"}
                shelfCategory={'wantToRead'}
                books={this.state.wantToRead}
                shelfChange = {this.onChangeShelf}
              />
              <Shelf 
                shelfTitle={"Read"} 
                shelfCategory={'read'}
                books={this.state.read} 
                shelfChange = {this.onChangeShelf}
                />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
        )} />
        <Route path='/search'
            render={()=>(
              <SearchPage
              shelfChange={this.onChangeShelf}
            />
            ) 
           } 
          />
      </div>
    );
  }
}

export default BooksApp
