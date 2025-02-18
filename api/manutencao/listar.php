<?php
require '../config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM manutencoes ORDER BY data_agendada ASC");
    $manutencoes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($manutencoes);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
