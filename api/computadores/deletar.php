<?php
require '../config.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(['erro' => 'ID não informado']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM computadores WHERE id = :id");
    $stmt->execute([':id' => $data['id']]);

    echo json_encode(['mensagem' => 'Computador deletado com sucesso']);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
