import './App.css';
import {Route, Routes,} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
    <Routes>
    <Route exact path="/" element = {<Register/>}/>
    <Route exact path="/Login" element = {<Login/>}/>
    <Route exact path="/Perfil" element = {<Profile/>}/>
    </Routes>
    </div>
  );
}

export default App;