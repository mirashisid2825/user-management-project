<?php
require_once '../database.php';
$data = json_decode(file_get_contents("php://input"));
if ($data->id) {
    $stmt = $conn->prepare("UPDATE users SET name=?, email=?, password=?, dob=? WHERE id=?");
    $stmt->bind_param("ssssi", $data->name, $data->email, $data->password, $data->dob, $data->id);
    $stmt->execute();
    echo json_encode(["message" => "User updated successfully"]);
} else {
    echo json_encode(["message" => "User ID required"]);
}
?>