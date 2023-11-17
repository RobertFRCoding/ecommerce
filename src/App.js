import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Routes en lugar de Switch

import Header from './components/Header';
import Home from './pages/Home';
import RegistroEmpresas from './pages/registroEmpresas';
import Empresas from './pages/Empresas';


import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registroEmpresas" element={<RegistroEmpresas />} />
        <Route path="/Empresas" element={<Empresas />} />
      </Routes>
    </Router>
  );
}

export default App;
