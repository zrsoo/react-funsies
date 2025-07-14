import React from 'react';
import logo from './logo.svg';
import './App.css';
import PhoneNumberInput from './components/PhoneNumberInput';

const onValidPhoneNumberChange = (phoneNumber: string) => {
  console.log("PARENT: received valid phone number -- " + phoneNumber);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PhoneNumberInput onValidChange={onValidPhoneNumberChange}/>
      </header>
      
    </div>
  );
}

export default App;
