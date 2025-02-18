<?php
require '../config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM computadores ORDER BY id ASC");
    $computadores = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($computadores);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
