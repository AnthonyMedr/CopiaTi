<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id']) || !isset($data['descricao']) || !isset($data['data_agendada']) || !isset($data['status'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE manutencoes SET descricao = :descricao, data_agendada = :data_agendada, status = :status WHERE id = :id");
    $stmt->execute([
        ':id' => $data['id'],
        ':descricao' => $data['descricao'],
        ':data_agendada' => $data['data_agendada'],
        ':status' => $data['status']
    ]);

    echo json_encode(['mensagem' => 'Manutenção atualizada com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
