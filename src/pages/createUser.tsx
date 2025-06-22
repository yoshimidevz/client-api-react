import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Create() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setUser(null);

    try {
      const res = await fetch("http://localhost:8080/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email }),
      });

      if (!res.ok) throw new Error("Erro ao criar usuário");

      const data = await res.json();
      setUser(data);
      setSuccess("Usuário criado com sucesso!");
      setNome("");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Criar Usuário</h1>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={createUser} disabled={loading}>
        {loading ? "Salvando..." : "Criar Usuário"}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}

      {user && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{user.nome}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;