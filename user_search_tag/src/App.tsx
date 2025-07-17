import React from 'react';
import logo from './logo.svg';
import './App.css';
import DebouncedSearchSelect from './components';

// 14:25

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DebouncedSearchSelect onChange={users => {console.log(users)}} />
      </header>
    </div>
  );
}

export default App;
