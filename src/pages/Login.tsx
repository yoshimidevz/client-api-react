import { useState } from "react";
import { saveToken } from "../utils/auth";
import { apiFetch } from "../utils/api";

function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await apiFetch("http://localhost:8080/login", { //essa apiFetch é uma função local do utils/api.tsx
        method: "POST",
        body: JSON.stringify({ nome, senha }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");

      const data = await res.json();

      if (!data.token) throw new Error("Token não retornado");

      saveToken(data.token);
      window.location.href = "/home";
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1>Login</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary" onClick={login} disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
}

export default Login;
