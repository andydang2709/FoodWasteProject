<?php

include 'dpconnect.php';

$userid = $_POST['userid'];
$userpassword = md5($_POST['userpassword']);

$sql = "SELECT * FROM users WHERE active='1' AND username = '" . $userid . "' AND password = '" . $userpassword ."';";


mysqli_query($con,$sql);

$result = mysqli_query($con,$sql);
$totalRows=mysqli_num_rows($result); 
if (!$totalRows)
{
	echo "NOT";
} else 
{	
		$row = mysqli_fetch_assoc($result);
		$userInfo = array (
		'email' => $row['username'],
		'name' => $row['fullname'],		
		'phone' => $row['phone'],
		'form' => $row['form'],
		'password' => $row['password'],
		'cardvalue' => 0);
		
		$userInfo = json_encode($userInfo);
		echo $userInfo;
};
$con->close();
?>