<?php
require '../config.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"]) || (!isset($data["descricao"]) && !isset($data["status"]))) {
    echo json_encode(["erro" => "Dados incompletos"]);
    exit;
}

$id = $data["id"];
$descricao = $data["descricao"] ?? null;
$status = $data["status"] ?? null;
$data_fechamento = ($status == "Fechado") ? date('Y-m-d H:i:s') : null;

$sql = "UPDATE chamados SET descricao = COALESCE(:descricao, descricao), status = :status, data_fechamento = :data_fechamento WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(["id" => $id, "descricao" => $descricao, "status" => $status, "data_fechamento" => $data_fechamento]);

echo json_encode(["mensagem" => "Chamado atualizado!"]);
