import './App.css';
import React,{useState} from 'react';
// import {Router, Routes, Route } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './COMPONENTS/Navbar';
import Home from './COMPONENTS/Home';
import About from './COMPONENTS/About';
import NoteState from './CONTEXT/notes/NoteState';
import Alert from './COMPONENTS/Alert';
import Login from './COMPONENTS/Login';
import Signup from './COMPONENTS/Signup';



function App(props) {
  const [alert, setAlert] = useState(null);
  //showAlert
  const showAlert =(msg,type)=>{
    setAlert({msg:msg,type:type});
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert ={alert} />
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
      <Route exact path="/About" element={<About showAlert={showAlert}/>}></Route>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
