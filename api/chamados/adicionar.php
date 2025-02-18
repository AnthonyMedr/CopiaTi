<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['computador_id']) || !isset($data['titulo']) || !isset($data['descricao'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO chamados (computador_id, titulo, descricao) VALUES (:computador_id, :titulo, :descricao)");
    $stmt->execute([
        ':computador_id' => $data['computador_id'],
        ':titulo' => $data['titulo'],
        ':descricao' => $data['descricao']
    ]);

    echo json_encode(['mensagem' => 'Chamado criado com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
