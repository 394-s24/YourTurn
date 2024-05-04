import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        YourTurn
      </header>
      <Timer></Timer>
    </div>
  );
};

export default App;
