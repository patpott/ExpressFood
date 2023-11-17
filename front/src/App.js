// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './screen/Accueil';
import DashboardAdmin from './screen/DashboardAdmin';
import PageLivreur from './screen/PageLivreur';
import LoginPage from './screen/LoginPage';
import MapComponent from './components/MapComponent';
import PageDeCommande from './screen/PageCommande';
import Register from './screen/Register';
import PageSuivieClient from './screen/Suivicommande';
const App = () => (

  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/dashboard" element={<DashboardAdmin/>} />
      <Route path="/livreur" element={<PageLivreur/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/map" element={<MapComponent/>} />
      <Route path="/commande" element={<PageDeCommande/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/client" element={<PageSuivieClient/>} />

    </Routes>
  </Router>
);

export default App;
