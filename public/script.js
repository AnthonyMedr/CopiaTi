const API_URL = "http://localhost/copiati/api/computadores";
const API_URL_CHAMADOS = "http://localhost/copiati/api/chamados";

window.onload = function () {
    carregarComputadores();
    carregarComputadoresParaChamado();
    carregarChamados();
};

// Função para carregar os computadores
async function carregarComputadores() {
    const tabela = document.getElementById("computadores-lista");
    if (!tabela) {
        console.error("Erro: Elemento 'computadores-lista' não encontrado.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/listar.php`);
        if (!response.ok) throw new Error("Erro ao buscar computadores");

        const computadores = await response.json();
        tabela.innerHTML = ""; // Limpa antes de preencher

        computadores.forEach(pc => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${pc.id}</td>
                <td>${pc.nome}</td>
                <td>${pc.ip}</td>
                <td>${pc.mac}</td>
                <td>${pc.descricao}</td>
                <td>
                    <button onclick="editarComputador(${pc.id}, '${pc.nome}', '${pc.ip}', '${pc.mac}', '${pc.descricao}')">✏️ Editar</button>
                    <button onclick="excluirComputador(${pc.id})">🗑️ Excluir</button>
                </td>
            `;
            tabela.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar computadores:", error);
    }
}

// Função para adicionar um computador
document.getElementById("form-computador").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const ip = document.getElementById("ip").value;
    const mac = document.getElementById("mac").value;
    const descricao = document.getElementById("descricao").value;

    const response = await fetch(`${API_URL}/adicionar.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, ip, mac, descricao })
    });

    const result = await response.json();
    alert(result.mensagem || result.erro);

    carregarComputadoresParaChamado();
    carregarComputadores();
});

// Função para editar um computador
function editarComputador(id, nome, ip, mac, descricao) {
    const novoNome = prompt("Novo nome:", nome);
    const novoIp = prompt("Novo IP:", ip);
    const novoMac = prompt("Novo MAC:", mac);
    const novaDescricao = prompt("Nova localização:", descricao);

    if (!novoNome || !novoIp || !novoMac || !novaDescricao) {
        alert("Edição cancelada ou campos inválidos.");
        return;
    }

    fetch(`${API_URL}/editar.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome: novoNome, ip: novoIp, mac: novoMac, descricao: novaDescricao })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.mensagem || result.erro);
        carregarComputadores();
        carregarComputadoresParaChamado();
    })
    .catch(error => console.error("Erro ao editar computador:", error));
}

// Função para excluir um computador
function excluirComputador(id) {
    if (!confirm("Tem certeza que deseja excluir este computador?")) return;

    fetch(`${API_URL}/deletar.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.mensagem || result.erro);
        carregarComputadores();
        carregarComputadoresParaChamado();
    })
    .catch(error => console.error("Erro ao excluir computador:", error));
}

// Carregar computadores no select do chamado
async function carregarComputadoresParaChamado() {
    const computadorSelect = document.getElementById("computador-id");
    if (!computadorSelect) {
        console.error("Erro: Elemento 'computador-id' não encontrado.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/listar.php`);
        if (!response.ok) throw new Error("Erro ao buscar computadores");

        const computadores = await response.json();
        computadorSelect.innerHTML = computadores.map(pc =>
            `<option value="${pc.id}">${pc.nome}</option>`
        ).join("");
    } catch (error) {
        console.error("Erro ao carregar computadores para chamado:", error);
    }
}

// Carregar chamados na tabela
async function carregarChamados() {
    const chamadosTabela = document.querySelector("#chamados-lista tbody");
    if (!chamadosTabela) {
        console.error("Erro: Elemento 'chamados-lista' não encontrado.");
        return;
    }

    try {
        const response = await fetch(`${API_URL_CHAMADOS}/listar.php`);
        if (!response.ok) throw new Error("Erro ao buscar chamados");

        const chamados = await response.json();
        chamadosTabela.innerHTML = chamados.map(chamado => `
            <tr>
                <td>${chamado.id}</td>
                <td>${chamado.computador}</td>
                <td>${chamado.descricao}</td>
                <td>${chamado.status}</td>
                <td>${chamado.data_abertura}</td>
                <td>
                    <button onclick="fecharChamado(${chamado.id})">✅ Fechar</button>
                    <button onclick="excluirChamado(${chamado.id})">🗑️ Excluir</button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar chamados:", error);
    }
}

// Adicionar um chamado
document.getElementById("form-chamado").addEventListener("submit", async function (e) {
    e.preventDefault();

    const computador_id = document.getElementById("computador-id").value;
    const descricao = document.getElementById("chamado-descricao").value;

    const response = await fetch(`${API_URL_CHAMADOS}/adicionar.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ computador_id, descricao })
    });

    const result = await response.json();
    alert(result.mensagem || result.erro);

    carregarChamados(); // Atualiza a lista
});


// Fechar chamado
function fecharChamado(id) {
    fetch(`${API_URL_CHAMADOS}/editar.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Fechado" })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.mensagem || result.erro);
        carregarChamados();
    })
    .catch(error => console.error("Erro ao fechar chamado:", error));
}

// Excluir chamado
function excluirChamado(id) {
    if (!confirm("Tem certeza que deseja excluir este chamado?")) return;

    fetch(`${API_URL_CHAMADOS}/deletar.php`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.mensagem || result.erro);
        carregarChamados();
    })
    .catch(error => console.error("Erro ao excluir chamado:", error));
}

// Torna as funções globais
window.editarComputador = editarComputador;
window.excluirComputador = excluirComputador;
window.fecharChamado = fecharChamado;
window.excluirChamado = excluirChamado;

//Carregar funções ao iniciar
carregarComputadores();
carregarComputadoresParaChamado();
carregarChamados();