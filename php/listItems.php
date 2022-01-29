<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
date_default_timezone_set("Africa/Johannesburg");
require 'conn/connection.php';
$n = json_decode(file_get_contents("php://input"), true);
$rid = "";
if (isset($n['rid'])) {
 $rid = $n['rid'];
}
$out = "[";
if ($rid !== "") {
 $sql = "SELECT * FROM `items` WHERE `rid` = $rid";
} else {
 $sql = "SELECT * FROM `items` ORDER BY `project` ASC, `priority` ASC, `rid` DESC;";
}
$result = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_assoc($result)) {
 $out .= "{";
 foreach ($row as $rowName => $rowValue) {
  $out .= '"' . $rowName . '":"' . $rowValue . '",';
 }
 $out = substr($out, 0, strlen($out) - 1) . "},";
}
$out = substr($out, 0, strlen($out) - 1) . "]";
echo $out;
mysqli_close($conn);
