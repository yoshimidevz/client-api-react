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
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<ListaTodosUsuarios />} />
          <Route path="/users/:id" element={<ListaUsuarioID />} />
          <Route path="/users/create" element={<CriarUsuario />} />
          <Route path="/users/edit/:id" element={<EditarUsuario />} />
        </Route>

      </Routes>
    </Router>
  );
}
export default App;
