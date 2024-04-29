import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import AllRoutes from './AllRoutes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'


function App() {
  return (
    <div>
      {/* <Navbar/> */}
      <AllRoutes/>
    </div>
  );
}

export default App;
