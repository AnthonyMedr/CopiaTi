<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nome']) || !isset($data['ip']) || !isset($data['mac']) || !isset($data['descricao'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO computadores (nome, ip, mac, descricao) VALUES (:nome, :ip, :mac, :descricao)");
    $stmt->execute([
        ':nome' => $data['nome'],
        ':ip' => $data['ip'],
        ':mac' => $data['mac'],
        ':descricao' => $data['descricao']
    ]);
    
    echo json_encode(['mensagem' => 'Computador adicionado com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
