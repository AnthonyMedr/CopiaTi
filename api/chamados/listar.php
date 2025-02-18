<?php
require '../config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM chamados ORDER BY criado_em DESC");
    $chamados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($chamados);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}
?>
