import Home from "./component/Home";
import Game from "./component/GamePage";
import Scores from "./component/HighScoresPage";
import Login from "./component/LoginPage";
import Header from "./component/Header";
import UserPage from "./component/UserPage";
import { useState } from 'react';

import { Routes, Route } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState(sessionStorage.getItem("userName"));

  function onLogout() {
    sessionStorage.removeItem("userName");
    setUserName(null);
  }

  return (
    <div className="App">
      <Header userName={userName} />
      <Routes>
        <Route index path='/' element={< Home />}/>
        <Route exact path='/game' element={< Game userName={userName} />}/>
        <Route exact path='/highscores' element={< Scores />}/>
        <Route exact path='/login' element={< Login onUserNameChanged={(newName) => setUserName(newName)} /> } />
        <Route exact path="/user" element={< UserPage userName={userName} onLogout={onLogout} />}/>
      </Routes>
    </div>
  );
}

export default App;