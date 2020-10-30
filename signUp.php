<?php
include 'dpconnect.php';
include 'mailer.php';

$userid = $_POST['Userid'];
$userpassword = md5($_POST['Userpassword']);
$fullname = $_POST['Fullname'];
$phone = $_POST['Phone'];
$form = $_POST['Form'];
$activationcode=md5($userid);

$sql = "SELECT * FROM users WHERE username= '" . $userid . "' ;";
mysqli_query($con,$sql);

$result = mysqli_query($con,$sql);
$totalRows=mysqli_num_rows($result); 

if (!$totalRows)
{
	$sql = "INSERT INTO users (username, password, fullname, phone, form, activationcode, active) VALUES ('$userid','$userpassword','$fullname','$phone','$form', '$activationcode','0')";
	mysqli_query($con, $sql);
	$subj = "Food waste: Account sign up verfication";
	$msg = "<h2> Account sign up verification</h2><p>Thank you for registration, kindly click the link below to activate your account: </p>";
	$msg = $msg . "<p><a href='http://catminh.biz/foodwaste/verify.php?acc=$userid&hash=$activationcode'>Verify now....</a></p>";
	$msg = $msg . "<hr><p>Food waste project team </p>";

	sendEmail($userid,$fullname,$subj,$msg);

	echo "OK";
}
else
{
	echo "Dupplicate entries";
}
$con->close();

?>