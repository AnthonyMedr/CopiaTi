const API_URL = "http://localhost/copiati/api/computadores";

// Função para carregar os computadores
async function carregarComputadores() {
    const response = await fetch(`${API_URL}/listar.php`);
    const computadores = await response.json();

    const tabela = document.getElementById("computadores-lista");
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
}

// Função para adicionar um novo computador
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
    
    carregarComputadores(); // Atualiza a tabela
});

// Função para editar um computador
function editarComputador(id, nome, ip, mac, descricao) {
    const novoNome = prompt("Novo nome:", nome);
    const novoIP = prompt("Novo IP:", ip);
    const novoMAC = prompt("Novo MAC:", mac);
    const novaDescricao = prompt("Nova localização:", descricao);

    if (novoNome && novoIP && novoMAC && novaDescricao) {
        fetch(`${API_URL}/editar.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, nome: novoNome, ip: novoIP, mac: novoMAC, descricao: novaDescricao })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem || data.erro);
            carregarComputadores();
        });
    }
}

// Função para excluir um computador
function excluirComputador(id) {
    if (confirm("Tem certeza que deseja excluir este computador?")) {
        fetch(`${API_URL}/deletar.php`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem || data.erro);
            carregarComputadores();
        });
    }
}

// Carregar a lista ao abrir a página
carregarComputadores();