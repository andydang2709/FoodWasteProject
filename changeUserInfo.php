<?php
include 'dpconnect.php';

$userid = $_POST['Userid'];
$userpassword = $_POST['Userpass'];
$fullname = $_POST['Username'];
$phone = $_POST['Userphone'];
$form = $_POST['Userform'];
$activepass = $_POST['Activepass'];
if ($activepass==$userpassword) {
	$sql = "UPDATE users SET fullname='$fullname', phone='$phone', form='$form' WHERE username = '" . $userid . "';";
} else {
	$userpassword = md5($_POST['Userpass']);
	$sql = "UPDATE users SET fullname='$fullname', phone='$phone', form='$form', password='$userpassword'  WHERE username = '" . $userid . "';";
}
mysqli_query($con,$sql);
$result = mysqli_query($con,$sql);

$con->close();

?>