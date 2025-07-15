import React from 'react';
import logo from './logo.svg';
import './App.css';
import TagManagerComponent from './components/TagManagerComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TagManagerComponent onChange={(tags: string[]) => console.log(tags)}/>
      </header>
    </div>
  );
}

export default App;
