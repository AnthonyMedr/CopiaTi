<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['nome']) || !isset($data['ip']) || !isset($data['mac']) || !isset($data['descricao'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE computadores SET nome = :nome, ip = :ip, mac = :mac, descricao = :descricao WHERE id = :id");
    $stmt->execute([
        ':id' => $data['id'],
        ':nome' => $data['nome'],
        ':ip' => $data['ip'],
        ':mac' => $data['mac'],
        ':descricao' => $data['descricao']
    ]);
    
    echo json_encode(['mensagem' => 'Computador atualizado com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
