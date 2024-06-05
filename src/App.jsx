import { useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDatabase } from "firebase/database";


// firebase import
import { initializeApp } from "firebase/app";

// firebase config
const firebaseConfig = {
  apiKey: "firebase API key here",
  authDomain: "firebase domain here",
  projectId: "firebase project id",
  storageBucket: "firebase storage bucket",
  messagingSenderId: "firebase messaging sender id",
  appId: "firebase app id",
  measurementId: "firebase measurement id"
};

// firebase app
const app = initializeApp(firebaseConfig);

const App = () => {
  const [count, setCount] = useState(0);
  const database = getDatabase(app);

  return (
    <div className="App">
      <header className="App-header">
        YourTurn
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home db={database}/>}/>
          <Route path="/swarm/:swarmUrl" element={<Timer db={database} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
