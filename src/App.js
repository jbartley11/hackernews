import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // define variable outside of return
  const helloWorld = 'Welcome to the road to learn react!'
  return (
    <div className="App">
      <h2>{helloWorld}</h2>
    </div>
  );
}

export default App;
