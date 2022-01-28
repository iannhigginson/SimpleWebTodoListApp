<?php // Errors

error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set("Africa/Johannesburg");
require 'conn/connection.php';
$n = json_decode(file_get_contents("php://input"), true);
$last_id = "";
$sql = 'UPDATE `items` SET ';

foreach ($n as $key => $value) {
 switch ($key) {
  case 'rid':
   $rid = $value;
   break;
  default:
   $sql .= '`' . $key . '` = "' . addslashes($value) . '", ';
   break;
 }
}

$sql = substr($sql, 0, strlen($sql) - 2) . ' WHERE `rid` = ' . $rid . ';';

echo $sql;
/** execute */
$result = mysqli_query($conn, $sql);
$af = mysqli_affected_rows($conn);
echo $af;
mysqli_close($conn);
