<?php
require_once '../database.php';
$id = $_GET['id'];
$result = $conn->query("SELECT * FROM users WHERE id=$id");
echo json_encode($result->fetch_assoc());
?>