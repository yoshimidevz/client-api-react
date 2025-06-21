import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, List, BarChart3 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Bem-vindo ao Gerenciador de Usuários
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sistema completo para gerenciar usuários com operações CRUD. 
          Adicione, visualize, edite e remova usuários de forma simples e eficiente.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Link
          to="/users"
          className="group bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <List className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-foreground group-hover:text-blue-600">
                Listar Usuários
              </h3>
              <p className="text-muted-foreground">
                Visualize todos os usuários cadastrados
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/users/create"
          className="group bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Plus className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-foreground group-hover:text-green-600">
                Novo Usuário
              </h3>
              <p className="text-muted-foreground">
                Adicione um novo usuário ao sistema
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;

