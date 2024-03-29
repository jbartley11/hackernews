import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


// return a function
const isSearched = searchTerm => item => {
  
    // returns true or false
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopStories = result => {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchChange = event => {
    this.setState({searchTerm: event.target.value});

  }
  onDismiss = id => {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({ 
      result: {...this.state.result, hits: updatedHits}
    });
  }

  render() {

    // destructure state
    const { searchTerm, result } = this.state;

    if (!result) { return null; }

    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
          Search
          </Search>
        </div>
          
        { result && 
        <Table 
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        }
        
      </div>
    );
  }
}
const Search = ({ value, onChange, children }) =>

  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

  const Table = ({ list, pattern, onDismiss}) =>

    <div className="table">
      {list.filter(isSearched(pattern)).map(item => 
          <div key={item.objectID} className="table-row">
          <span className="largeColumn">
            <a href={item.url}>{item.title}</a>
          </span>
          <span className="midColumn">{item.author}</span>
          <span className="smallColumn">{item.num_comments}</span>
          <span className="smallColumn">{item.points}</span>
          <span className="smallColumn">
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          
          </span>
      </div>)}
    </div>


const Button = ({ onClick, className='', children }) =>

    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>


export default App;
