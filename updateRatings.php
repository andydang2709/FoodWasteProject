<?php
include 'dpconnect.php';

$foodid = $_POST['foodid'];
$ratings = $_POST['ratings'];
$reviews = '{"day":"' . date('Y-m-d H:i:s') . '","review":"' . $_POST['reviews']  . '"}';

$sql = "SELECT * FROM foodmenu WHERE foodid='$foodid';";
mysqli_query($con,$sql);
$result = mysqli_query($con,$sql);
$row = mysqli_fetch_assoc($result);
if (!$row) {echo "Not found";} else {

    if ($row['rating']<>"") { $newRatings = $row['rating'] . "," . $ratings;} else {$newRatings = $ratings;}
    if ($row['review']<>"") {$newReviews = $row['review'] . "," . $reviews;} else {$newReviews = $reviews;}

    $sql = "UPDATE foodmenu SET rating='$newRatings', review='$newReviews' WHERE foodid='$foodid'; ";
    mysqli_query($con,$sql);
    $result = mysqli_query($con,$sql); 
    echo $sql;}

$con->close();
?>