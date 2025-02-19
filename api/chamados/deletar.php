<?php
require '../config.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode(["erro" => "ID do chamado é necessário"]);
    exit;
}

$id = $data["id"];
$sql = "DELETE FROM chamados WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(["id" => $id]);

echo json_encode(["mensagem" => "Chamado excluído com sucesso!"]);
