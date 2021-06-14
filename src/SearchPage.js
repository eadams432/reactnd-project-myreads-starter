import React from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchPage extends React.Component{

    state = {
        query: '',
        results: [],
        shelvedBooks: this.props.savedBooks ? this.props.savedBooks : []
    }

    //need to look up saved books here in case user navigates to search page directly
    componentDidMount() {
      if(!this.state.shelvedBooks.length>0){
        BooksAPI.getAll().then((allBooks) => {
          this.setState({
            shelvedBooks: allBooks
          });
        })
      }
    }

    onSearch = (searchTerms) => {
      BooksAPI.search(searchTerms).then(searchResult=>{
          if(Array.isArray(searchResult) && searchResult.length>0){
            searchResult.map(result=>{
              return result.shelf = this.checkBookStatus(result);
            });
            this.setState({
                results: searchResult
            });
          } else {
            this.setState({
              results: []
          });
          }
      });
    }

    checkBookStatus = (book) => {
      let shelf = 'none';
      for(let shelfBook of this.state.shelvedBooks){
        if (shelfBook.id === book.id){
          shelf = shelfBook.shelf;
          break;
        }
      }
      return shelf;
    }

    updateQuery = (event) => {
        const newQuery = event.target.value;
        this.setState({
            query:newQuery
        });
        this.onSearch(newQuery);
    }


    render(){
        const resultsDisplay = this.state.results.length > 0 ? 
          this.state.results.map(book=>(
            <li className='books-grid-li' key={book.id}>
              <Book book={book} shelfChange={this.props.shelfChange} shelf={book.shelf}/>
            </li> ))
            :
             this.state.query ? <li>No results found</li> : '';

        return(
            <div className="search-books">
            <div className="search-books-bar">
              {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
              <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                placeholder="Search by title or author" 
                value={this.state.query}
                onChange={this.updateQuery}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {resultsDisplay}
              </ol>
            </div>
          </div>
        );
    }
}

SearchPage.propTypes = {
  shelfChange: PropTypes.func.isRequired,
  savedBooks: PropTypes.array,
}

export default SearchPage;