<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['computador_id']) || !isset($data['descricao']) || !isset($data['data_agendada'])) {
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO manutencoes (computador_id, descricao, data_agendada) VALUES (:computador_id, :descricao, :data_agendada)");
    $stmt->execute([
        ':computador_id' => $data['computador_id'],
        ':descricao' => $data['descricao'],
        ':data_agendada' => $data['data_agendada']
    ]);

    echo json_encode(['mensagem' => 'Manutenção agendada com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
