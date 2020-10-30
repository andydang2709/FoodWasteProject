<?php
                    include 'dpconnect.php';
                    $selectday = $_POST['dayOfWeek'];
                    if ($selectday="Fullmenu") { $sql = "SELECT * FROM foodmenu;"; }
                    else { $sql = "SELECT * FROM foodmenu WHERE (date='" .$selectday."');" ; }
                    
                    mysqli_query($con,$sql);
                    $query = mysqli_query($con,$sql);
                    $result = array();
                    $row=mysqli_num_rows($query);                   
                    
                    while($row = mysqli_fetch_assoc($query))
                    {
                      $result [] = array (
                        'date' => $row['date'],
                        'cate' => $row['cate'],
                        'foodid' => $row['foodid'],
                        'name' => $row['name'],
                        'description' => $row['description'],
                        'consumerReviews' => $row['review'],
                        'consumerRatings' => $row['rating'],
                        'price' => $row['price'],
                      );                      
                    }                     
                  $con->close();
                  $result = json_encode($result);
                  echo $result;
?>