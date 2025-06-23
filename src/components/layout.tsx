import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Users, Home, Plus } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b fixed-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-p">
          <div className="flex justify-between items-center h-16">
            <div className="d-flex flex-row justify-content-between p-2 align-items-center">
              <h1 className="text-xl font-semibold text-foreground">
                Gerenciador de Usuários
              </h1>
              <Users className="w-2 text-primary mr-3" />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <Link
                to="/home"
                className={`inline-flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium ${
                  isActive('/home')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Início
              </Link>
              <Link
                to="/users"
                className={`inline-flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium ${
                  isActive('/users')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </Link>
              <Link
                to="/users/create"
                className={`inline-flex items-center px-1 pt-1 pb-4 border-b-2 text-sm font-medium ${
                  isActive('/users/create')
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet /> {/* Aqui o conteúdo da rota será injetado */}
        </div>
      </main>
    </div>
  );
};

export default Layout;