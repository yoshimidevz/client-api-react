import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Edit3 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

type User = {
  id: number;
  nome: string;
  email: string;
};

function List() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");

  // Busca todos os usuários
  const fetchAllUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/users");
      if (!res.ok) throw new Error("Erro na requisição");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca usuário por ID
  const fetchUserById = async () => {
    if (!searchId.trim()) {
      fetchAllUsers();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/users?id=${searchId}`);
      if (!res.ok) throw new Error("Erro na requisição");
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Deleta um usuário e recarrega a lista
  const handleDelete = async (id: number) => {
    if (!window.confirm("Confirma exclusão deste usuário?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erro ao excluir usuário");
      await fetchAllUsers();
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Lista de todos os usuários</h1>

      

      {/* Busca por ID */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={fetchUserById}
          disabled={loading}
        >
          Pesquisar
        </button>
      </div>

      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && !loading && <div className="alert alert-warning">{error}</div>}

      {!loading && !error && users.length > 0 && ( //AQUI LISTA TODOS
        <ul className="list-group">
          {users.map((u) => (
            <li
              key={u.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {/* ID à esquerda */}
              <span className="me-3 fw-bold">{u.id}</span>

              {/* Dados do usuário */}
              <div className="flex-fill">
                <strong>{u.nome}</strong>
                <br />
                <small>{u.email}</small>
              </div>

              {/* Botões de ação */}
              <div className="btn-group ms-3">
                <Link
                  to={`/users/edit/${u.id}`} 
                  className="btn btn-sm btn-warning"
                  title="Editar"
                >
                  <Edit3 size={16} />
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(u.id)}
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="my-3 border-primary text-primary shadow-p" onClick={fetchAllUsers}>
        Voltar
      </button>

    </div>
  );
}

export default List;
