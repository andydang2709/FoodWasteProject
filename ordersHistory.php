<?php
include 'dpconnect.php';
$userid = $_POST['userid'];
$sql = "SELECT * FROM orders WHERE username = '" . $userid . "';";
mysqli_query($con,$sql);
$result = mysqli_query($con,$sql);
$totalRows=mysqli_num_rows($result);
if (!$totalRows) { echo "0"; } else 
{	    $i=0;
        $order[] = array();        
        while ($row = mysqli_fetch_assoc($result)) {
            $order[$i] = array (
            'userid' => $row['username'],
            'ordernumber' => $row['ordernumber'],
            'orderdate' => $row['orderdate'],
            'orderitem' => $row['orderitem']
            );
            $i = $i+1;
        }
        $result = json_encode($order);
        echo $result;
};
$con->close();
?>