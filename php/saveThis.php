<?php // Errors

error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set("Africa/Johannesburg");
require 'conn/connection.php';
$n = json_decode(file_get_contents("php://input"), true);
$last_id = "";
$fsql = "INSERT INTO `items` (";
$lsql = " VALUES (";
foreach ($n as $key => $value) {
 switch ($key) {
  case 'note':
   $fsql .= "`" . $key . "`, ";
   $lsql .= "'"  . addslashes($value) . "', ";
   break;
  default:
   $fsql .= "`" . $key . "`, ";
   $lsql .= "'"  . $value . "', ";
   break;
 }
}
$sql = substr($fsql, 0, strlen($fsql) - 2) . ")" . substr($lsql, 0, strlen($lsql) - 2) . ");";
$result = mysqli_query($conn, $sql);
$af = mysqli_affected_rows($conn);
echo $af;
mysqli_close($conn);
