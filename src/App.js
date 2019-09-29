import React,{useState} from 'react';
import logo from './logo.svg';
import Timer from './components/Timer';
import './css/App.css';




function App() {
  const [isBreak,setIsBreak] = useState(false);

  return (
    <div className="App">
      <header className={
        `App-header ${isBreak? "is-break": "is-focus"}`
      }>
        {/* <img src={logo} className="App-logo" alt="logo" width="150" /> */}
        <Timer updateBreak={setIsBreak}></Timer>
      </header>
    </div>
  );
}

export default App;
