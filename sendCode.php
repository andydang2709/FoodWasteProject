<?php
    include 'mailer.php';

    $userid = $_POST['Userid'];
    $fullname = $_POST['Fullname'];
    $code = $_POST['Code'];

	$subj = "Food waste: Order Verification Code";
	$msg = "<h2> Your order verification code: " .$code. "</h2>";
	
	$msg = $msg . "<hr><p>Food waste project team </p>";

	sendEmail($userid,$fullname,$subj,$msg);
?>