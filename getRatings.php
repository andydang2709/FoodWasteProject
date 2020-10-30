<?php
include 'dpconnect.php';
$sql = "SELECT * FROM foodmenu WHERE rating<>''; ";
mysqli_query($con,$sql);
$result = mysqli_query($con,$sql);
$totalRows=mysqli_num_rows($result);
if (!$totalRows) { echo ""; } else 
{	    $i=0;
        $order[] = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $order[$i] = array (
            'foodid' => $row['foodid'],
            'ratings' => $row['rating'],            
            );
            $i = $i+1;
        }
        $result = json_encode($order);
        echo $result;
};
$con->close();
?>