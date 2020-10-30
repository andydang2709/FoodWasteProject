<?php
include 'dpconnect.php';
include 'mailer.php';

$userid = $_POST['Userid'];
$fullname = $userid;

$sql = "SELECT * FROM users WHERE username= '" . $userid . "' ;";
mysqli_query($con,$sql);

$result = mysqli_query($con,$sql);
$totalRows=mysqli_num_rows($result); 

if ($totalRows!=0)
{
	$subj = "Food waste: Reset password request";
	$msg = "<h2> Reset password</h2><p>Kindly click the link below to reset your password: </p>";
	$msg = $msg . "<p><a href='http://catminh.biz/foodwaste/resetPass.php?acc=$userid'>Reset now....</a></p>";
	$msg = $msg . "<hr><p>Food waste project team </p>";

	sendEmail($userid,$fullname,$subj,$msg);

	echo "OK";
}
else
{
	echo "NOT";
}
$con->close();

?>