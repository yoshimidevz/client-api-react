import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function List() {
  const [id, setId] = useState("");
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const res = await fetch(`http://localhost:8080/users?id=${id}`);
      if (!res.ok) throw new Error("Erro na requisição");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setUser({ nome: data[0].nome, email: data[0].email });
      }
      else {
      setError("Usuário não encontrado");
      }
      

    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Buscar Usuário por ID</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o ID do usuário"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchUser}>
          Buscar
        </button>
      </div>

      {loading && <div className="alert alert-info">Carregando...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {user && (
        <div className="card mt-4">
          <div className="card-body ">
            <h5 className="card-title">{user.nome}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;