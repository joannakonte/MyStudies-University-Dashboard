// // App.js
// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar'; 
import Header from './Components/Header/Header'
// import Home from './Components/Home/Home';
// import Login from './Components/Login/Login';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       {/* <Sidebar /> */}
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// // export default App;

import React from 'react';
import TableComponent from './Components/DataTable/DataTable';
import Sidebar from './Components/Sidebar/Sidebar'; 

const App = () => {
  return (
    <div>
      <Sidebar />
      <TableComponent showOptionColumn={true} />
    </div>
  );
};

export default App;