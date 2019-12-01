import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]

// const isSearched = searchTerm => item => {
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());
// }
// return a function
const isSearched = searchTerm => item => {
  
    // returns true or false
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange = event => {
    this.setState({searchTerm: event.target.value});

  }
  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  render() {

    // destructure state
    const { searchTerm, list } = this.state;

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
          
      
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />

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
