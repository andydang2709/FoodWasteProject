<?php
$userid = $_GET['acc'];
$hash = $_GET['hash'];
$sql = "UPDATE users SET active='1' WHERE username = '" . $userid . "' AND activationcode = '" . $hash ."';";

include 'dpconnect.php';
mysqli_query($con,$sql);
$con->close();
echo "<h2>Your account has been verified. Please log in to use the system</h2>";
?>
