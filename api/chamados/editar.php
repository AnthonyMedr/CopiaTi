<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['titulo']) || !isset($data['descricao']) || !isset($data['solucao']) || !isset($data['status'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE chamados SET titulo = :titulo, descricao = :descricao, solucao = :solucao, status = :status, resolvido_em = NOW() WHERE id = :id");
    $stmt->execute([
        ':id' => $data['id'],
        ':titulo' => $data['titulo'],
        ':descricao' => $data['descricao'],
        ':solucao' => $data['solucao'],
        ':status' => $data['status']
    ]);

    echo json_encode(['mensagem' => 'Chamado atualizado com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
