<?php // Errors

error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set("Africa/Johannesburg");
require 'conn/connection.php';
$n = json_decode(file_get_contents("php://input"), true);
$rid = $n['rid'];
$sql = "DELETE FROM `items` WHERE `rid` = $rid";
$result = mysqli_query($conn, $sql);
$af = mysqli_affected_rows($conn);
echo $af;
mysqli_close($conn);
