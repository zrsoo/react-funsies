import logo from './logo.svg';
import './App.css';
import SplitAmountComponent from './components/SplitAmountComponent';

// 15:25

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <SplitAmountComponent />   
      </header>
    </div>
  );
}

export default App;
