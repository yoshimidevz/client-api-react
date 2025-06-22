import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // função para buscar dados do usuário
  const fetchUser = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:8080/users?id=${id}`);
      if (!res.ok) throw new Error("Erro ao buscar usuário");

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setNome(data[0].nome);
        setEmail(data[0].email);
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  // função para atualizar o usuário
  const updateUser = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nome, email }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar usuário");

      setSuccess("Usuário atualizado com sucesso!");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Editar Usuário</h1>

      {loading && <div className="alert alert-info">Carregando...</div>}

      {nome && (
        <>
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

          <button className="btn btn-warning" onClick={updateUser} disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar"}
          </button>
        </>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
}

export default Edit;
