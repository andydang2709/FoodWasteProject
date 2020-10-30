<?php
include 'dpconnect.php';

$user = $_POST['userInfo'];
$order = $_POST['orderItem'];
$orderNo = $_POST['orderNumber'];
$orderdate = date('Y-m-d H:i:s');

$sql = "INSERT INTO orders (`username`, `ordernumber`,`orderdate`, `orderitem`) VALUES ('$user','$orderNo','$orderdate','$order')";

mysqli_query($con,$sql);

$con->close();

?>