<?php
require '../config.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["computador_id"]) || !isset($data["descricao"])) {
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

$computador_id = $data["computador_id"];
$descricao = $data["descricao"];

$sql = "INSERT INTO chamados (computador_id, descricao) VALUES (:computador_id, :descricao)";
$stmt = $pdo->prepare($sql);
$stmt->execute(["computador_id" => $computador_id, "descricao" => $descricao]);

echo json_encode(["mensagem" => "Chamado criado com sucesso!"]);
