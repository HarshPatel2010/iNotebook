import './App.css';
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
function App() {
  return (
    <>
    <NoteState>
     
    <Router>
    <Navbar/>
    <Alert message={"Amazing React course"} />
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/About" element={<About/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
