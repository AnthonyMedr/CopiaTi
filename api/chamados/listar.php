<?php
require '../config.php';
header("Content-Type: application/json");

$sql = "SELECT c.id, c.descricao, c.status, c.data_abertura, c.data_fechamento, 
               p.nome AS computador 
        FROM chamados c
        JOIN computadores p ON c.computador_id = p.id";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$chamados = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($chamados);
