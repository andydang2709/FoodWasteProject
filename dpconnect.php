<?php
$username = "root"; 
$password= "cm21/14a";      
$server = "localhost";   
$dbname = "khangdb";    
 
$con = mysqli_connect($server, $username, $password, $dbname);

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
?>