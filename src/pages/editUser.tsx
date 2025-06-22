import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => { //função que vai buscar os dados do usuário pelo ID
    setLoading(true); //começa o carregamento
    setError(""); //limpa o erro
    setNome(""); //limpa o nome
    setEmail(""); //limpa o email
    setSuccess(""); //limpa mensagem de sucesso

    try {
      const res = await fetch(`http://localhost:8080/users?id=${id}`);  //faz a requisição GET para buscar o usuário pelo ID
      if (!res.ok) throw new Error("Erro ao buscar usuário");  //espera uma resposta OK, se não for, lança um erro

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

      const data = await res.json();
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

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o ID do usuário"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchUser} disabled={loading}>
          Buscar
        </button>
      </div>

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
