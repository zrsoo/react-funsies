import React from 'react';
import logo from './logo.svg';
import './App.css';
import EditableList from './components';

// 13:10

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EditableList onChange={(items) => console.log(items)}/>
      </header>
    </div>
  );
}

export default App;
