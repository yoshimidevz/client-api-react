import React from "react";

function Navbar(){
    return(
        <nav className="d-flex flex-row justify-content-between bg-light p-2">
            <a>Título do Projeto</a>
            <div>
                <button className="bg-secondary m-1">Criar</button>
                <button className="bg-secondary m-1">Listar</button>
            </div>
        </nav>
    )
}

export default Navbar;