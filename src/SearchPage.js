import React from 'react';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Book from './Book';

class SearchPage extends React.Component{

    state = {
        query: '',
        results: []
    }

    onSearch = (searchTerms) => {
        BooksAPI.search(searchTerms).then(searchResult=>{
            console.log(searchResult);
            if(Array.isArray(searchResult)){
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

    updateQuery = (event) => {
        const newQuery = event.target.value;
        this.setState({
            query:newQuery
        });
        if (newQuery.length>0){
            this.onSearch(newQuery);
        }
    }

    render(){
        const resultsDisplay = this.state.results.length > 0 ? 
          this.state.results.map(book=>(
            <li key={book.title}>
              <Book book={book}/>
            </li> ))
            :
            <li>No books found</li>;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
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
              <ol className="books-grid"></ol>
              {resultsDisplay}
            </div>
          </div>
        );
    }
}

export default SearchPage;