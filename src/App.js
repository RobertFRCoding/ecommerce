import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Routes en lugar de Switch

import Header from './components/Header';
import Home from './pages/Home';
import Acercade from './pages/Acercade';
import RegistroEmpresas from './pages/registroEmpresas';
import RegistroProducto from './pages/registroProducto';
import Empresas from './pages/Empresas';


import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Header />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/Acercade" element={<Acercade />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registroEmpresas" element={<RegistroEmpresas />} />
        <Route path="/registroProducto" element={<RegistroProducto />} />
        <Route path="/Empresas" element={<Empresas />} />
      </Routes>
    </Router>
  );
}

export default App;
