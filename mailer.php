<?php
function sendEmail($to, $name, $subj, $msg) {
    include "libs/class.phpmailer.php"; 
    include "libs/class.smtp.php";

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp.gmail.com"; 
    $mail->Port = 465; 
    $mail->SMTPAuth = true; 
    $mail->SMTPSecure = 'ssl';
    $mail->CharSet = "UTF-8";
    $mail->Username = "linhdang1072@gmail.com"; 
    $mail->Password = "cjwmcgmhuumtulqd"; 
    $from = "linhdang1072@gmail.com";    
    $mail->From = $from;
    $mail->FromName = "BIS Food Waste";

    $mail->AddAddress($to,$name);

    $mail->AddReplyTo($from,"BIS Food Waste");
    $mail->WordWrap = 50; 
    $mail->IsHTML(true); 
    $mail->Subject = $subj;

    $mail->Body = $msg;
    $mail->AltBody = "This is an auto-generated email, do not reply";
    $mail->Send();

return $mail; }

?>