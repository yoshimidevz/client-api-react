import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import ListaUsuarios from './pages/ListaUsuarios';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<ListaUsuarios />} />
          {/* <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
