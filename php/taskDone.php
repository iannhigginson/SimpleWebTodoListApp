<?php // Errors

error_reporting(E_ALL);
ini_set('display_errors', 1);

date_default_timezone_set("Africa/Johannesburg");

require 'conn/connection.php';

$n = json_decode(file_get_contents("php://input"), true);

$rid = $n['id'];
if ($n['done'] === false) {
 $done = 0;
} elseif ($n['done'] === true) {
 $done = 1;
}

$sql = "UPDATE `items` SET `done` = '$done' WHERE `rid` = $rid";

// execute
$result = mysqli_query($conn, $sql);

$af = mysqli_affected_rows($conn);
/** Speak to the new user */
echo $af;

// Closing connection
mysqli_close($conn);
