<?php
require_once 'login.php';

echo file_get_contents("mainpage.html");

// Create connection with MySQL database
$conn = new mysqli($hn,$un,$pw,$db);
if ($conn->connect_error)die("Connection failed: ".$conn->connect_error);
echo "Connected successfully<br>";

// Display table of Logged in Users uploaded Content
  $query = "SELECT * FROM data";
  $result = $conn->query($query);
  if (!$result)die("Database access faild: ".$conn->error);

  $rows = $result->num_rows;
  echo "<table></tr>";
  for ($j = 0 ; $j < $rows ; ++$j)
  {
    $result->data_seek($j);
    $row = $result->fetch_array(MYSQLI_NUM);
    echo "<tr>";
    for ($k = 0 ; $k < 12; ++$k) echo "<td>$row[$k]</td>";
    echo "</tr>";
  }
  echo "</table><br>";

// Close connections to database
$conn->close();

// Sanitizing functions
  function sanitizeString($var) {
    if(get_magic_quotes_gpc()) $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
  }
  function sanitizeMySQL($connection, $var) {
    $var = $connection->real_escape_string($var);
    $var = sanitizeString($var);
    return $var;
  }
  function fixFileName($name){
    return strtolower(preg_replace("[^A‐Za‐z0‐9.]", "", $name));
  }

 ?>
