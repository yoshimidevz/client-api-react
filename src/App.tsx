import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import ListaTodosUsuarios from './pages/listUsers';
import ListaUsuarioID from './pages/listUserID';
import CriarUsuario from './pages/createUser';
import EditarUsuario from './pages/editUser';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<ListaTodosUsuarios />} />
          <Route path="/users/:id" element={<ListaUsuarioID />} />
          <Route path="/users/create" element={<CriarUsuario/>} />
          <Route path="/users/edit/:id" element={<EditarUsuario />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
