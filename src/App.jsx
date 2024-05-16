import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './components/Timer';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getDatabase } from "firebase/database";


// firebase import
import { initializeApp } from "firebase/app";

// firebase connfitg
const firebaseConfig = {
  apiKey: "AIzaSyAlAO_z2B82y8MWjngetQDtk1HU5EC0Xf4",
  authDomain: "yourturn-orange.firebaseapp.com",
  projectId: "yourturn-orange",
  storageBucket: "yourturn-orange.appspot.com",
  messagingSenderId: "519165106567",
  appId: "1:519165106567:web:ca2edcd2f679a0ee275b22",
  measurementId: "G-KTW54R6PYP"
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
