<?php
require_once '../database.php';
$data = json_decode(file_get_contents("php://input"));
if ($data->name && $data->email && $data->password && $data->dob) {
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, dob) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data->name, $data->email, $data->password, $data->dob);
    $stmt->execute();
    echo json_encode(["message" => "User created successfully"]);
} else {
    echo json_encode(["message" => "Invalid input"]);
}
?>