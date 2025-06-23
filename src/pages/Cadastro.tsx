import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { href } from "react-router-dom";

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [user, setUser] = useState<{ nome: string; email: string; senha: string } | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const createUser = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        setUser(null);

        try {
            // 1. Cadastrar
            const res = await fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!res.ok) throw new Error("Erro ao se cadastrar");

            const data = await res.json();
            setUser(data);

            // 2. Fazer login automático para pegar token
            const loginRes = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, senha }), // Login usa nome e senha, como no PHP
            });

            if (!loginRes.ok) throw new Error("Erro ao fazer login");

            const loginData = await loginRes.json();

            // 3. Salvar token
            localStorage.setItem("token", loginData.token); // ou sessionStorage

            setSuccess("Usuário cadastrado e autenticado com sucesso!");
            setNome("");
            setEmail("");
            setSenha("");
        } catch (err: any) {
            setError(err.message || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Cadastro</h1>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <button className="btn btn-success" onClick={createUser} disabled={loading}>
                {loading ? "Salvando..." : "Criar Usuário"}
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
            <button
                className="btn btn-primary mt-3"
                onClick={() => {
                    window.location.href = "/login"; // Redireciona para a página de login
                }}
            >
                Login
            </button>
        </div>
    );
}

export default Cadastro;