import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home/Home'; 
import Login from './Components/Login/Login'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
