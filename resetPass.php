<?php
$str = "aQb0WxdEz1R2cTY3eUvIk5bOP4Ajf6SD7rFGt8HqJKsLZdhX9CmVBNnM";
$tmpPass="";
    for ($i=1;$i<10;$i++) {
        $index = rand(0,56);
        $tmpPass = $tmpPass . substr($str,$index,1);
    }
$userid = $_GET['acc'];
$tmp = md5($tmpPass);
$sql = "UPDATE users SET password='$tmp' WHERE username = '" . $userid . "';";
include 'dpconnect.php';
mysqli_query($con,$sql);
$con->close();
echo "<h2>Please use this password: '$tmpPass' to log in. You can change password in Account Update</h2>";
?>