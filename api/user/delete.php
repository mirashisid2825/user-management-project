<?php
require_once '../database.php';
$data = json_decode(file_get_contents("php://input"));
if ($data->id) {
    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
    $stmt->bind_param("i", $data->id);
    $stmt->execute();
    echo json_encode(["message" => "User deleted successfully"]);
} else {
    echo json_encode(["message" => "User ID required"]);
}
?>